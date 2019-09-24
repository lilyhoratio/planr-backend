const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        {
          id: 1,
          email: "john@test.com",
          password: bcrypt.hashSync("test", 14),
          name: "John Smith",
          role_id: 1
        },
        {
          id: 2,
          email: "tester@example.com",
          password: bcrypt.hashSync("test", 14),
          name: "Jane Doe",
          role_id: 1
        },
        {
          id: 3,
          email: "read@example.com",
          password: bcrypt.hashSync("test", 14),
          name: "Event Reader",
          role_id: 2
        }
      ]);
    });
};
