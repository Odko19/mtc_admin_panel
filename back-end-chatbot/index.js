const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const socket = require("socket.io");
app.use(cors());
const messageRoutes = require("./routes/v1/messages");

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(userId);
    console.log(socket.id);
  });

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  //   // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  // });

  socket.on("send-msg", (data) => {
    console.log(data.msg);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use("/v1", messageRoutes);

server.listen(3006, () => {
  console.log(`SERVER RUNNING ${3006}`);
});
