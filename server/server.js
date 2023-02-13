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

let users = [];
app.use(cors());
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("Someone Connected");
  socket.on("joinroom", (roomId, username) => {
    console.log("User Joined Room");
    console.log(roomId, username);
    socket.join(roomId);
    addUser(username, roomId);
    socket.to(roomId).emit("user-connected", username);
    io.to(roomId).emit("all-users", getRoomUsers(roomId));
    // socket.to(roomId).emit("add-stream", (stream) => {
    //   users.forEach((user) => {
    //     if (user !== socket) {
    //       console.log("add new video")
    //       socket.emit("new-remote-stream", stream);
    //     }
    //   });
    // });

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
      console.log("disconnected");
      socket.leave(roomId);
      userLeave(username);
      io.to(roomId).emit("all-users", getRoomUsers(roomId));
    });
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
app.get("/cart", (req, res) => {
  res.json({
    data: [
      {
        productname: ["apple"],
        image: "C:UserspiyawanDesktopproj_finalsenior-projsrcimageapple.png",
      },
      {
        productname: ["orange"],
        image: "C:UserspiyawanDesktopproj_finalsenior-projsrcimageorange.png",
      },
    ],
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
