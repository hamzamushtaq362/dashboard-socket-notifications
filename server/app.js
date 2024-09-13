const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const { router } = require("./src/routes");
const { initSocket } = require("./socketManager");

const server = http.createServer(app);
initSocket(server);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

app.use("/api", router);

// Route to emit a message
// app.post("/api/notify", (req, res) => {
//   const { message } = req.body;

//   if (!message) {
//     return res.status(400).json({ error: "Message is required" });
//   }

//   // Emit message to all connected clients
//   io.emit("notification", { message });

//   res.status(200).json({ success: "Message sent to all clients" });
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
