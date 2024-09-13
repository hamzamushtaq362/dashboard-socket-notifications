const router = require("express").Router();
const { User } = require("../handler");
const { getSocket } = require("../../socketManager"); // Import getSocket from socket.js
const handler = new User();

router.post("/signup", handler.signup);
router.post("/login", handler.login);

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Emit a notification to the admin
    const io = getSocket();
    io.emit("notification", {
      message: `A new user has registered: ${username}`,
      type: "userRegistration",
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/notify", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Emit message to all connected clients
  const io = getSocket();
  io.emit("notification", { message });

  res.status(200).json({ success: "Message sent to all clients" });
});

module.exports = router;
