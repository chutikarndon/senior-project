const express = require("express");
const cors = require("cors");
const app = express();
const port = 7000;
const { db } = require("./firebase.js");
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

app.use(cors());
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let interval;

const users = {};

const socketToRoom = {};

const cart = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 10) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

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

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });

  socket.on("collect", (data) => {
    if (cart[data.roomID]) {
      const roomCart = cart[data.roomID];
      roomCart.push(data.id);
    } else {
      cart[data.roomID] = [data.id];
    }
  });

  socket.on("delete", (data) => {
    let roomCart = cart[data.roomID];
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

app.get("/index", (req, res) => {
  res.json({ festival: ["NewYear", "Tomb Sweeping"] });
});

app.get("/cart/:roomID", async (req, res) => {
  const dbProducts = db.collection("products");
  const _id = req.params.roomID;
  let roomCart, products = [];

  if (cart[_id]) {
    roomCart = cart[_id];
    const promises = roomCart.map(async (pid) => {
      const productSnapshot = await dbProducts.where("id", "==", pid).get();
      if (productSnapshot.empty) {
        throw new Error('Product with ID ${pid} not found in database.');
      }
      return productSnapshot.docs[0].data();
    });
    try {
      products = await Promise.all(promises);
      roomCart = products
    } catch (error) {
      console.error(error);
    }
  }
  else{
    roomCart = []
  }
  res.json({
    roomCart
  });
});

app.get("/getProducts", cors(), async (req, res) => {
  cors();
  const dbProducts = db.collection("products");
  const fruitsInfo = await dbProducts.where("type", "==", "fruit").get();
  const fruits = [];
  fruitsInfo.forEach((doc) => {
    fruits.push(doc.data());
  });
  res.status(200).json({
    fruits,
  });
});
// app.listen(port, () => console.log(`Server listening on port ${port}!`));
http.listen(port, () => console.log(`Listening on port ${port}`));

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
  console.log("fetch api success");
  const { username, roomId, password } = req.body;
  const roomInfo = db.collection("rooms");
  const roomExist = await roomInfo
    .where("roomId", "==", roomId)
    .where("password", "==", password)
    .get();
  console.log("fetch to database success");
  if (roomExist.empty) {
    console.log("return roomnotexist success");
    res.status(404).send("ID or password is incorrect");
    return;
  } else {
    console.log("return roomexist success");
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
  console.log(users);
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
