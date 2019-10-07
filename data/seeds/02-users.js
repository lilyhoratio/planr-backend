const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
  return knex("users").insert([
    {
      email: "john@test.com",
      password: bcrypt.hashSync("test", 14),
      name: "John Smith",
      role_id: 1
    },
    {
      email: "tester@example.com",
      password: bcrypt.hashSync("test", 14),
      name: "Jane Doe",
      role_id: 1
    },
    {
      email: "read@example.com",
      password: bcrypt.hashSync("test", 14),
      name: "Event Reader",
      role_id: 2
    }
  ]);
};
