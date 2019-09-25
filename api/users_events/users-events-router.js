const express = require("express");
const Auth = require("../middleware/auth-middleware.js");
const UserEvents = require("./users-events-model.js");
const router = express.Router();

// GET /api/users-events
router.get(`/`, Auth.restricted, (req, res) => {
  const userId = req.user.id;

  UserEvents.getEventsByUserId(userId)
    .then(userEvents => {
      console.log(userEvents);
      res.status(200).json(userEvents);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({
          message: "Error occurred while getting all user events.",
          err
        });
    });
});

// req.user.id

module.exports = router;
