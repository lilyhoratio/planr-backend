exports.seed = function(knex) {
  return knex("vendors").insert([
    { id: 1, name: "Troomp Hotel", type: "Lodging" },
    { id: 2, name: "Catering Co.", type: "Food & Beverage" },
    { id: 3, name: "Car Rental Co.", type: "Transportation" },
    { id: 4, name: "Party rental equipment co.", type: "Entertainment" }
  ]);
};
