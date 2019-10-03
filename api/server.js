require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const Auth = require("./middleware/auth-middleware.js");

// Routes
const eventsRouter = require("./events/events-router.js");
const usersRouter = require("./users/users-router.js");
const usersEventsRouter = require("./users_events/users-events-router.js");
const budgetItemsRouter = require("./budget_items/items-router.js");
const vendorsRouter = require("./vendors/vendors-router.js");
const metricsRouter = require("./metrics/metrics-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
// server.use(
//   cors({
//     allowedHeaders: ["Content-Type"],
//     origin: "*",
//     preflightContinue: true
//   })
// );

// server.use(
//   cors({
//     origin: function(origin, callback) {
//       callback(null, true);
//     }
//   })
// );

server.use(cors());

// later - add Auth.restricted to all routes except users
server.use(`/api/events`, eventsRouter);
server.use(`/api/users`, usersRouter);
server.use(`/api/users-events`, usersEventsRouter);
server.use(`/api/budget-items`, budgetItemsRouter);
server.use(`/api/vendors`, vendorsRouter);
server.use(`/api/metrics`, metricsRouter);

server.use(`/docs`, express.static("./docs"));

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server up and running!" });
});

module.exports = server;
