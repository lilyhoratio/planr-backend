// const Users = require("../users/users-model.js");
const Events = require("../events/events-model.js");
// const Items = require("../items/items-model.js");
// const Vendors = require("../vendors/vendors-model.js");

module.exports = {
  validateUniqueEmail,
  validateUser,
  validateUserId,
  validateLogin,
  validateEvent,
  validateEventId
};

// ================ VALIDATION FOR USERS ROUTER ================

function validateUniqueEmail(req, res, next) {
  const { id } = req.params;
  const { email } = req.body;

  Users.getUsers()
    .then(users => users.filter(user => user.email === email))
    .then(([result]) => {
      if (result) {
        if (id == result.id) {
          next();
        } else {
          res.status(400).json({
            message: `Account with ${email} already exists. Please choose another e-mail.`
          });
        }
      } else {
        next();
      }
    });
}

function validateUser(req, res, next) {
  const user = req.body;

  if (
    !user.email ||
    !user.name ||
    !user.password ||
    !user.company ||
    !user.role
  ) {
    res.status(400).json({
      message: "Missing email, password, name, company, or role."
    });
  }

  if (Object.keys(user).length > 5) {
    res.status(400).json({
      message:
        "A new user must have only an email, password, name, company, and role."
    });
  }

  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getUserById(id)
    .then(user => {
      if (user) {
        req.validUser = user;
        next();
      } else {
        res
          .status(404)
          .json({ message: `User with the id ${id} does not exist.` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while getting a user by id.", err });
    });
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Missing email or password." });
  }

  next();
}

// ================ VALIDATION FOR EVENTS ROUTER ================

function validateEvent(req, res, next) {
  const e = req.body;

  if (!e.user_id || !e.event || !e.budget || !e.start_date) {
    res
      .status(400)
      .json({ message: "Missing user_id, event, budget, or start_date." });
  }

  next();
}

function validateEventId(req, res, next) {
  const { id } = req.params;

  Events.getEventById(id)
    .then(event => {
      if (event) {
        req.validEvent = event;
        next();
      } else {
        res
          .status(404)
          .json({ message: `Event with the id ${id} does not exist.` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while getting an event by id.", err });
    });
}

// ================ VALIDATION FOR ITEMS ROUTER ================
