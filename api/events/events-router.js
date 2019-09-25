const express = require("express");
const Events = require("./events-model.js");
const Validate = require("../middleware/validation-middleware.js");
const router = express.Router();

/**
 * @api {get} /events Get Events Information
 * @apiName GetEvents
 * @apiGroup Events
 *
 * @apiSuccess {Object[]} events Array of events
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 1,
 *     "created_by": 1,
 *     "name": "Company Party",
 *     "description": "A company-wide party to celebrate acquisition.",
 *     "budget": 23230,
 *     "location": "Building A, Room 232",
 *     "start_date": "2019-01-21",
 *     "end_date": "2019-01-23"
 *   },
 *   {
 *     "id": 2,
 *     "created_by": 1,
 *     "name": "Company luncheon",
 *     "description": "A company-wide lunch",
 *     "budget": 12320,
 *     "location": "Courtyard near the lobby",
 *     "start_date": "2019-02-15",
 *     "end_date": null
 *   },
 * ]
 */

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

/**
 * @api {get} /events/:id Get Event Information
 * @apiName GetEvent
 * @apiGroup Events
 *
 * @apiSuccess {Number} id Event id
 * @apiSuccess {Number} created_by Created by user id
 * @apiSuccess {String} name Event name
 * @apiSuccess {Decimal} budget Event budget
 * @apiSuccess {String} location Event location
 * @apiSuccess {Date} start_date Event start date
 * @apiSuccess {Date} end_date Event end date
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "id": 3,
 * "created_by": 1,
 * "name": "Surprise Birthday",
 * "description": "A surprise birthday party for the ceo",
 * "budget": 2210,
 * "location": "Banquet room",
 * "start_date": "2019-03-04",
 * "end_date": "2019-03-05",
 * "budgetItems": [
 *    {
 *     "name": "Rental buses",
 *      "cost": 300,
 *      "completed": false,
 *      "quantity": 10
 *    },
 *    {
 *      "name": "Lobby rental",
 *      "cost": 800,
 *      "completed": true,
 *      "quantity": 1
 *   }
 * ],
 * "vendors": [
 *    {
 *      "id": 1,
 *      "name": "Catering Co.",
 *      "type": "Food & Beverage"
 *    },
 *    {
 *      "id": 2,
 *      "name": "Fairfax Hotel",
 *      "type": "Lodging"
 *    }
 * ]
 * }
 */

router.get("/:id", Validate.validateEventId, (req, res) => {
  const { id } = req.params;

  // goes into catch when querying for event that doesn't exist
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

// // GET /api/events/:id/budget-items
router.get("/:id/budget-items", Validate.validateEventId, (req, res) => {
  const { id } = req.params;

  Events.getBudgetItemsByEventId(id)
    .then(budgetItems => {
      res.status(200).json(budgetItems);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error occurred while getting budget items by event id.",
        err
      });
    });
});

module.exports = router;
