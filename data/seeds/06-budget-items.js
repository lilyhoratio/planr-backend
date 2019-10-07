exports.seed = function(knex) {
  return knex("budget_items")
    .del()
    .then(function() {
      return knex("budget_items").insert([
        {
          event_id: 1,
          name: "Room rental",
          vendor_id: 1,
          quantity: null,
          cost: 0,
          completed: false
        },
        {
          event_id: 1,
          name: "picnic tables",
          vendor_id: 4,
          quantity: 2,
          cost: 20,
          completed: false
        },
        {
          event_id: 1,
          name: "Business catering package",
          vendor_id: 2,
          quantity: 1,
          cost: 0,
          completed: false
        },
        {
          event_id: 2,
          name: "drinks",
          vendor_id: 2,
          quantity: null,
          cost: 0,
          completed: false
        },
        {
          event_id: 3,
          name: "Burritos",
          vendor_id: 2,
          quantity: null,
          cost: 10,
          completed: false
        },
        {
          event_id: 2,
          name: "napkins",
          vendor_id: 4,
          quantity: null,
          cost: 0,
          completed: false
        },
        {
          event_id: 1,
          name: "Rental buses",
          vendor_id: 3,
          quantity: 5,
          cost: 300,
          completed: false
        },
        {
          event_id: 3,
          name: "Rental buses",
          vendor_id: 3,
          quantity: 10,
          cost: 300,
          completed: false
        },
        {
          event_id: 4,
          name: "balloons",
          vendor_id: 4,
          quantity: null,
          cost: 1,
          completed: false
        },
        {
          event_id: 3,
          name: "Room rental",
          vendor_id: 1,
          quantity: 1,
          cost: 300,
          completed: false
        }
      ]);
    });
};
