exports.seed = function(knex) {
  return knex("vendors").insert([
    { name: "Troomp Hotel", type: "Lodging" },
    { name: "Catering Co.", type: "Food & Beverage" },
    { name: "Car Rental Co.", type: "Transportation" },
    { name: "Party rental equipment co.", type: "Entertainment" }
  ]);
};
