const express = require("express");
const Metrics = require("./metrics-model.js");
const router = express.Router();

router.get(`/events`, (req, res) => {
  Metrics.getEventsMetrics()
    .then(metrics => {
      res.status(200).json(metrics);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error occurred while getting events' metrics.",
        err
      });
    });
});

router.get(`/budget-items`, (req, res) => {
  Metrics.getBudgetItemsMetrics()
    .then(metrics => {
      res.status(200).json(metrics);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error occurred while getting budget items' metrics.",
        err
      });
    });
});

// getBudgetItemsCostByEventId
router.get(`/budget-items/:eventId`, (req, res) => {
  const { eventId } = req.params;
  Metrics.getBudgetItemsCostByEventId(eventId)
    .then(metrics => {
      res.status(200).json(metrics);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: `Error occurred while getting event ${eventId} budget items' metrics.`,
        err
      });
    });
});

module.exports = router;
