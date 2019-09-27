exports.seed = function(knex) {
  return knex("users_events").insert([
    {
      id: 1,
      event_id: 1,
      user_id: 1
    },
    {
      id: 2,
      event_id: 1,
      user_id: 2
    },
    {
      id: 3,
      event_id: 1,
      user_id: 3
    },
    {
      id: 4,
      event_id: 2,
      user_id: 3
    },
    {
      id: 5,
      event_id: 3,
      user_id: 3
    }
  ]);
};
