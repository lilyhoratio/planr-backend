// // // average budget across events - fix later
// router.get(`/analytics`, (req, res) => {
//   Events.getEventsAnalytics()
//     .then(eventsAnalytics => {
//       res.status(200).json(eventsAnalytics);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         message: "Error occurred while getting events' analytics.",
//         err
//       });
//     });
// });

// // ANALYTICS - events-router
// router.get(`/:id/budget-items-cost`, (req, res) => {
//   const { id } = req.params;

//   Events.getBudgetItemsCostByEventId(id)
//     .then(cost => {
//       res.status(200).json(cost);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         message:
//           "Error occurred while getting total cost of budget items by event id",
//         err
//       });
//     });
// });
