const express = require("express");

const Events = require("./events-model.js");
const Validate = require("../middleware/validation-middleware.js");

const router = express.Router();

// GET /api/events
router.get("/", (req, res) => {
  Events.getEvents()
    .then(events => {
      res.status(200).json(events);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error occurred while getting all events.", err });
    });
});

// GET /api/events/:id
router.get("/:id", Validate.validateEventId, (req, res) => {
  const { id } = req.params;

  Events.getEventById(id)
    .then(event => {
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: `No event with the id ${id} found.` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while getting event by id.", err });
    });
});

// // POST /api/events/
router.post("/", Validate.validateEvent, (req, res) => {
  const event = req.body;

  Events.addEvent(event)
    .then(newEvent => {
      res.status(201).json(newEvent);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while adding a new event.", err });
    });
});

// // PUT /api/events/:id
router.put(
  "/:id",
  Validate.validateEventId,
  Validate.validateEvent,
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Events.updateEvent(changes, id)
      .then(event => {
        res.status(200).json(event);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Error occurred while updating event.", err });
      });
  }
);

// // DELETE /api/events/:id
router.delete("/:id", Validate.validateEventId, (req, res) => {
  const { id } = req.params;

  Events.deleteEvent(id)
    .then(outcome => {
      res
        .status(200)
        .json({ message: `Event with the id ${id} successfully deleted.` });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while deleting event.", err });
    });
});

module.exports = router;
