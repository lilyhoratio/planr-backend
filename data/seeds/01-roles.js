exports.seed = function(knex) {
  return knex("roles")
    .truncate()
    .then(function() {
      return knex("roles").insert([
        { id: 1, name: "admin" },
        { id: 2, name: "user" }
      ]);
    });
};
