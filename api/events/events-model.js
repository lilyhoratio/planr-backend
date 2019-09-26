const db = require("../../data/dbConfig.js");

module.exports = {
  addEvent,
  getEventsBy,
  getEventById,
  getBudgetItemsByEventId,
  getVendorsByEventId,
  getEvents,
  updateEvent,
  deleteEvent
};

function getEvents() {
  return db("events");
}

function getEventsBy(filter) {
  return db("events").where(filter);
}

function getEventById(id) {
  // v1 - just event table info
  // return db("events")
  //   .where({ id })
  //   .first();

  // v2 - event has budget items and vendors list
  const eventQuery = db("events")
    .where({ id })
    .first();
  const budgetItemsQuery = getBudgetItemsByEventId(id);
  const vendorsQuery = getVendorsByEventId(id);

  return Promise.all([eventQuery, budgetItemsQuery, vendorsQuery]).then(
    ([event, budgetItems, vendors]) => {
      if (event) {
        event.budgetItems = budgetItems;
        event.vendors = vendors;
        return event;
      } else {
        return null;
      }
    }
  );
}

function getBudgetItemsByEventId(id) {
  return db("events as e")
    .select("sli.name", "sli.cost", "sli.completed", "sli.quantity")
    .leftJoin("shopping_list_items AS sli", {
      "e.id": "sli.event_id"
    })
    .where({ event_id: id });
}

function getVendorsByEventId(id) {
  return db("events AS e")
    .select("v.id", "v.name", "v.type")
    .leftJoin("shopping_list_items AS sli", {
      "e.id": "sli.event_id"
    })
    .leftJoin("vendors AS v", {
      "v.id": "sli.vendor_id"
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
    .then(_ => getEventById(id));
}

function deleteEvent(id) {
  return db("events")
    .where("id", id)
    .del();
}
