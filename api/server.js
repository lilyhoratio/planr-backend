require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Routes
const eventsRouter = require("./events/events-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(`/api/events`, eventsRouter);
server.use(`/api/users`, usersRouter);

// STRETCH - EVENTS BY USER

const Events = require("./events/events-model");
const Validate = require("./middleware/auth-middleware.js");
// GET /api/users/events - all events by users/events - decode token in middleware
// req.user.id
// server.get(`/api/users/events/`);

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
