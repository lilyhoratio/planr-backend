const db = require("../../data/dbConfig.js");

module.exports = {
  addEvent,
  getEventsBy,
  getEventById,
  getBudgetItemsByEventId,
  getEvents,
  updateEvent,
  deleteEvent
};

function getEvents() {
  // v1 - just events
  return db("events");
}

function getEventsBy(filter) {
  return db("events").where(filter);
}

function getEventById(id) {
  // v1 - just event
  // return db("events")
  //   .where({ id })
  //   .first();

  // v2 - event has budget items array
  const eventQuery = db("events")
    .where({ id })
    .first();
  const budgetItemsQuery = getBudgetItemsByEventId(id);

  return Promise.all([eventQuery, budgetItemsQuery]).then(
    ([event, budgetItems]) => {
      event.budgetItems = budgetItems;
      return event;
    }
  );
}

// shopping list items
function getBudgetItemsByEventId(id) {
  return db("shopping_list_items AS sli")
    .select(
      "sli.name as budget_item_name",
      "sli.cost as budget_item_cost",
      "sli.completed as budget_item_completed",
      "sli.quantity as budget_item_completed"
      // "e.name as event_name"
    )
    .join("events AS e", {
      "e.id": "sli.event_id"
    })
    .where({ event_id: id });
}

function addEvent(event) {
  return db("events")
    .insert(event, "id")
    .then(([id]) => getEventById(id));
}

function updateEvent(changes, id) {
  return db("events")
    .where("id", id)
    .update(changes)
    .then(outcome => getEventById(id));
}

function deleteEvent(id) {
  return db("events")
    .where("id", id)
    .del();
}
