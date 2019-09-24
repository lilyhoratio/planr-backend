exports.seed = function(knex) {
  return knex("events")
    .truncate()
    .then(function() {
      return knex("events").insert([
        {
          id: 1,
          created_by: 1,
          name: "Company party",
          description: "A company-wide party",
          budget: 23230,
          location: "Building A, Room 232",
          start_date: "2019-01-21",
          end_date: "2019-01-23"
        },
        {
          id: 2,
          created_by: 1,
          name: "Company luncheon",
          description: "A company-wide lunch",
          budget: 12320,
          location: "Courtyard near the lobby",
          start_date: "2019-02-15",
          end_date: null
        },
        {
          id: 3,
          created_by: 1,
          name: "Surprise Birthday",
          description: "A surprise birthday party for the ceo",
          budget: 2210,
          location: "Banquet room",
          start_date: "2019-03-04",
          end_date: "2019-03-05"
        },
        {
          id: 4,
          created_by: 2,
          name: "Kelly's baby shower",
          description:
            "Kelly is having a baby girl soon, so we thought it would be nice to throw her a baby shower!",
          budget: 2230,
          location: "2332 Railway St.",
          start_date: "2019-04-28",
          end_date: null
        },
        {
          id: 5,
          created_by: 2,
          name: "Product launch",
          description: "First launch of the company product.",
          budget: 32320,
          location: "982 Tree Rd",
          start_date: "2019-09-19",
          end_date: null
        }
      ]);
    });
};
