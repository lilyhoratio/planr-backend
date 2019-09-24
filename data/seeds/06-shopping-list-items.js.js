exports.seed = function(knex) {
  return knex("shopping_list_items")
    .truncate()
    .then(function() {
      return knex("shopping_list_items").insert([
        {
          id: 1,
          event_id: 1,
          name: "Room rental",
          vendor_id: 1,
          quantity: null,
          cost: 0,
          completed: false
        },
        {
          id: 2,
          event_id: 1,
          name: "picnic tables",
          vendor_id: 4,
          quantity: 2,
          cost: 20,
          completed: false
        },
        {
          id: 3,
          event_id: 1,
          name: "Business catering package",
          vendor_id: 2,
          quantity: 1,
          cost: 0,
          completed: false
        },
        {
          id: 4,
          event_id: 2,
          name: "drinks",
          vendor_id: 2,
          quantity: null,
          cost: 0,
          completed: false
        },
        {
          id: 5,
          event_id: 3,
          name: "Burritos",
          vendor_id: 2,
          quantity: null,
          cost: 10,
          completed: false
        },
        {
          id: 6,
          event_id: 2,
          name: "napkins",
          vendor_id: 4,
          quantity: null,
          cost: 0,
          completed: false
        },
        {
          id: 7,
          event_id: 1,
          name: "Rental buses",
          vendor_id: 3,
          quantity: 5,
          cost: 300,
          completed: false
        },
        {
          id: 8,
          event_id: 3,
          name: "Rental buses",
          vendor_id: 3,
          quantity: 10,
          cost: 300,
          completed: false
        },
        {
          id: 9,
          event_id: 4,
          name: "balloons",
          vendor_id: 4,
          quantity: null,
          cost: 1,
          completed: false
        },
        {
          id: 10,
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
