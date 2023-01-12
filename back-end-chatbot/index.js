// const express = require("express");
// const socketIo = require("socket.io");
// const http = require("http");
// const router = require("./router");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// io.on("connection", (socket) => {
//   console.log("connection");
//   socket.on("disconnected", () => {
//     console.log("disconnected");
//   });
// });

// app.use("/", router);
// server.listen(3005, () => {
//   console.log(`server started ${3005}`);
// });

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data);
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3006, () => {
  console.log(`SERVER RUNNING ${3006}`);
});
