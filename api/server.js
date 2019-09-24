require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Routes
const eventsRouter = require("./events/events-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(`/api/events`, eventsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server up and running!" });
});

module.exports = server;
