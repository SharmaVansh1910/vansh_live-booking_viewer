const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static("public"));

// In-memory bookings array
let bookings = [];

// Sample venue names for more realistic data
const venueNames = [
  "The Golden Spoon",
  "Bella Vista Restaurant",
  "Ocean View Bistro",
  "The Royal Oak",
  "Crimson Steakhouse",
  "Garden Terrace",
  "Blue Moon Café",
  "The Rustic Table",
  "Sunset Grill",
  "Metro Diner",
  "The Cozy Corner",
  "Starlight Lounge",
  "Harbour View",
  "The Green Olive",
  "Mountain Peak Restaurant",
];

// Generate a mock booking every 5 seconds
setInterval(() => {
  const booking = {
    venueName: venueNames[Math.floor(Math.random() * venueNames.length)],
    partySize: Math.floor(Math.random() * 8) + 1, // 1-8 people
    time: new Date().toLocaleTimeString(),
  };

  bookings.unshift(booking); // add to top

  // Keep only last 50 bookings to prevent memory issues
  if (bookings.length > 50) {
    bookings = bookings.slice(0, 50);
  }

  io.emit("new-booking", booking); // send to all clients
  console.log(
    `New booking: ${booking.venueName} - Party of ${booking.partySize} at ${booking.time}`
  );
}, 5000);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send existing bookings when a new client connects
  socket.emit("initial-bookings", bookings);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
