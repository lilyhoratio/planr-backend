const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./users-model.js");
const Auth = require("../middleware/auth-middleware.js");
const Validate = require("../middleware/validation-middleware.js");

const router = express.Router();

// POST /api/users/register
router.post(
  "/register",
  Validate.validateUniqueEmail,
  Validate.validateUser,
  (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.addUser(user)
      .then(newUser => {
        const token = Auth.generateToken(newUser);

        res.status(201).json({
          message: `Welcome ${newUser.name}!`,
          user_id: newUser.id,
          token,
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error occurred while registering a user.", err });
      });
  },
);

// POST /api/users/login
router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Users.getUsersBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = Auth.generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.name}!`,
          user_id: user.id,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while logging in.", err });
    });
});

// GET /api/users
router.get("/", Auth.restricted, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while getting all users.", err });
    });
});

// GET /api/users/:id
router.get("/:id", Auth.restricted, Validate.validateUserId, (req, res) => {
  res.status(200).json(req.validUser);
});

// PUT /api/users/:id
router.put(
  "/:id",
  Auth.restricted,
  Validate.validateUserId,
  Validate.validateUniqueEmail,
  Validate.validateUser,
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const hash = bcrypt.hashSync(changes.password, 14);
    changes.password = hash;

    Users.updateUser(changes, id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error occurred while updating user.", err });
      });
  },
);

// DELETE /api/user/:id
router.delete("/:id", Auth.restricted, Validate.validateUserId, (req, res) => {
  const { id } = req.params;

  Users.deleteUser(id)
    .then(outcome => {
      res
        .status(200)
        .json({ message: `User with the id ${id} successfully deleted.` });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while deleting user.", err });
    });
});

module.exports = router;
