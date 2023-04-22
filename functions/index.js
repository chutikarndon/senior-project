const express = require("express");
const cors = require('cors');
const app = express();
const uuid = require("uuid");
const uuid4 = uuid.v4();
const bodyParser = require("body-parser");
const { ExpressPeerServer } = require("peer");
const url = require("url");
const http = require("http").Server(app);
// const peerServer = ExpressPeerServer(http, {
//   // Here we are actually defining our peer server that we want to host
//   debug: true,
// });
const path = require("path");
const { db } = require("./firebase.js");

app.use(cors({origin: true}));

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app')

const admin = require('firebase-admin');
const { getFirestore, initializeFirestore } = require("firebase-admin/firestore")
const { query, orderBy, limit } = require("firebase/firestore"); 
// admin.initializeApp();

// const db = getFirestore();

//run local เปลี่ยนเป็น http://localhost:3000 ใน origin
//deploy ใช้ https://web-app-for-awc-1061d.web.app
const io = require("socket.io")(http, {
  cors: {
    origin:["http://localhost:3000","https://web-app-for-awc-1061d.web.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let interval;

const users = {}

const usersName = {};

const socketToRoom = {};

const cart = {};

const isShareVideo = {};

io.on("connection", (socket) => {
  socket.on("join room", (data) => {
    if (users[data.roomID]) {
      const length = users[data.roomID].length;
      if (length === 10) {
        socket.emit("room full");
        return;
      }
      users[data.roomID].push(socket.id);
      usersName[data.roomID].push(data.userName);
      isShareVideo[data.roomID] = true;
    } else {
      users[data.roomID] = [socket.id];
      usersName[data.roomID] = [data.userName];
      isShareVideo[data.roomID] = true;
    }
    socketToRoom[socket.id] = data.roomID;
    const usersInThisRoom = users[data.roomID].filter((id) => id !== socket.id);
    socket.emit("all users", usersInThisRoom);
  });

  socket.on("update member", (roomID) => {
    const members = usersName[roomID];
    socket.emit("member in room", members)
  })

  socket.on("update cart", async (roomID) => {
    cartdata = await getCartData(roomID);
    socket.emit("cart in room", cartdata)
  })


  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("show shared video", (data) => {
    let isShow = data.enabled;
    if(isShareVideo[data.roomID]) {
      isShareVideo[data.roomID] = false
      isShow = false
    }
    else {
      isShareVideo[data.roomID] = true
      isShow = true
    }
    console.log(data.roomID,":",isShow)
    console.log(isShareVideo[data.roomID])
    const id = socket.id
    socket.broadcast.emit("show to all user", {isShow,id})
  })

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    //let member = usersName[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
    
    socket.broadcast.emit("user left",socket.id)
  });

  socket.on("delete member",(data) => {
    const {username,roomID} = data
    let members = usersName[roomID];
    members = members.filter((name) => name !== username)
    usersName[roomID] = members;
  })

  socket.on("collect", (data) => {
    if (cart[data.roomID]) {
      const roomCart = cart[data.roomID];
      roomCart.push(data.id);
    }
      else {
      cart[data.roomID] = [data.id];
    }
  });

  socket.on("delete", (data) => {
    let roomCart = cart[data.roomID];
    console.log(data.pid)
    roomCart = roomCart.filter((id) => id !== data.pid);
    console.log(roomCart)
    cart[data.roomID] = roomCart;
    console.log(data.pid)
    roomCart = roomCart.filter((id) => id !== data.pid);
    console.log(roomCart)
    cart[data.roomID] = roomCart;
  });
});

app.use(bodyParser.json()); // for parsing application/json
const allowedOrigins = [
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:8100",
  "http://localhost:3000",
  "https://web-app-for-awc-1061d.web.app"
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

// Enable preflight requests for all routes
app.options("*", cors(corsOptions));

app.options("/createRoom", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

app.options("/joinRoom", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

app.options("/RoomMeet", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

exports.bangkok = functions.https.onRequest((req, res) => { return res.status(200).send(
      "Hello bangkok"
    );
});



app.get("/festival", async function (req, res) {
  const dbFestival = db.collection("Festival");
  const nearFestivalInfo = await dbFestival.orderBy('festivalDate','desc').limit(1).get();
  const festival = nearFestivalInfo.docs[0].data();
  const name = festival.festivalName;
  const date = festival.festivalDate.toDate();
  console.log(festival.festivalName);
  res.status(200).json({
    date,name
  });
});

async function getCartData(roomID){
  const dbProducts = db.collection("products");
  const _id = roomID;
  let roomCart  = [];
  let products = [];
  let paper = [];
  let fruit = [];
  let food = [];

  if (cart[_id]) {
    roomCart = cart[_id];
    const promises = roomCart.map(async (pid) => {
      const productSnapshot = await dbProducts.where("id", "==", pid).get();
      if (productSnapshot.empty) {
        throw new Error(`Product with ID ${pid} not found in database.`);
      }
      return productSnapshot.docs[0].data();
    });
    try {
      products = await Promise.all(promises);
      roomCart = products
      paper = products.filter((product) => product.type == "paper")
      fruit = products.filter((product) => product.type == "fruit")
      food = products.filter((product) => product.type == "food")
    } catch (error) {
      console.error(error);
    }
  }
  else{
    roomCart = []
    paper = []
    fruit = []
    food = []
  }
  return { roomCart,paper,fruit,food }
  
};

app.get("/getProducts", cors(), async (req, res) => {
  cors();
  const dbProducts = db.collection("products");
  const fruitsInfo = await dbProducts.where("type", "==", "fruit").get();
  const fruits = [];
  fruitsInfo.forEach((doc) => {
    fruits.push(doc.data());
  });

  const foodInfo = await dbProducts.where("type", "==", "food").get();
  const food = [];
  foodInfo.forEach((doc) => {
    food.push(doc.data());
  });

  const paperInfo = await dbProducts.where("type", "==", "paper").get();
  const paper = [];
  paperInfo.forEach((doc) => {
    paper.push(doc.data());
  });

  res.status(200).json({
    fruits,food,paper
  });
});


app.post("/createRoom", cors(), async (req, res) => {
  cors();
  const { fname, lname, password } = req.body;
  const dbRoom = await db.collection("rooms").add({
    fname: fname,
    lname: lname,
    password: password,
    roomId: uuid4,
  });
  res.status(201).json({
    fname: fname,
    lname: lname,
    password: password,
    roomId: uuid4,
  });
});

// app.use("/peerjs", peerServer);

app.post("/joinRoom", cors(), async (req, res) => {
  cors();
  const { username, roomId, password } = req.body;
  const roomInfo = db.collection("rooms");
  const roomExist = await roomInfo
    .where("roomId", "==", roomId)
    .where("password", "==", password)
    .get();
  if (roomExist.empty) {
    res.status(404).send("ID or password is incorrect");
    return;
  } else {
    res.status(200).send("Success");

    // res.redirect(
    //   url.format({
    //     pathname: `/join/${roomId}`,
    //     query:{ roomId: roomId, username: username },
    //   }),
    // );
  }
});

const addUser = (username, roomId) => {
  users.push({
    username: username,
    roomId: roomId,
  });
};

const userLeave = (username) => {
  users = users.filter((users) => users.username != username);
};

const getRoomUsers = (roomId) => {
  return users.filter((user) => user.roomId == roomId);
};

// app.get("/join/:rooms", cors(), (req, res) => {
//   cors();
//   const { username, roomId } = req.body;
//   console.log(username);
//   res.redirect(
//     url.format({
//       pathname: "/RoomMeet",
//       query: { roomid: roomId, Myname: username },
//     })
//   ); // we render our js file and pass the data we need in it
//   // }); // i.e we need the roomid and the username

// });

exports.main = functions.https.onRequest(app);
const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server listening on port ${port}!`));
http.listen(port, () => console.log(`Listening on port ${port}`));