require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Routes
const eventsRouter = require("./events/events-router.js");
const usersRouter = require("./users/users-router.js");
const usersEventsRouter = require("./users_events/users-events-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(`/api/events`, eventsRouter);
server.use(`/api/users`, usersRouter);
server.use(`/api/users-events`, usersEventsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server up and running!" });
});

module.exports = server;

// vendors
// 1) insert or get vendors 2) use vendor_id to create shopping list item
// type in vendor name -
// 2) shopping list item - accept vendor name >>> look for vendor_name in vendors table and insert it and return id
// vendor name unique to event
// get vendors for event for autocomplete - front end map over it

// Promise.all() // JSON aggregates
// {
// name,
// location,
// vendors: []
// }
