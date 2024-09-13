import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const App = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    socket.on("notification", (data) => {
      console.log("Received notification:", data.message);
      // Handle the notification (e.g., show an alert or update UI)
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  useEffect(() => {
    // Listen for the 'notification' event
    socket.on("notification", (data) => {
      if (data.type === "userRegistration") {
        // Display the notification
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          data.message,
        ]);
        // You can also show a UI alert or other forms of notification
        alert(data.message);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Notifications:</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
