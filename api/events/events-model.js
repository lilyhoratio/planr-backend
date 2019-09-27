const db = require("../../data/dbConfig.js");

module.exports = {
  addEvent,
  getEventsBy,
  getEventById,
  getBudgetItemsByEventId,
  getVendorsByEventId,
  getEvents,
  updateEvent,
  deleteEvent,
  getBudgetItemsCostByEventId,
  getEventsAnalytics
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
    .select("bi.name", "bi.cost", "bi.completed", "bi.quantity")
    .leftJoin("budget_items AS bi", {
      "e.id": "bi.event_id"
    })
    .where({ event_id: id });
}

function getVendorsByEventId(id) {
  return db("events AS e")
    .select("v.id", "v.name", "v.type")
    .leftJoin("budget_items AS bi", {
      "e.id": "bi.event_id"
    })
    .leftJoin("vendors AS v", {
      "v.id": "bi.vendor_id"
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

// ANALYTICS
async function getBudgetItemsCostByEventId(id) {
  const budgetItems = await getBudgetItemsByEventId(id);
  const sumRemainingBudgetItemsCost = budgetItems
    .filter(item => item.completed === 0)
    .map(item => {
      return item.cost * (item.quantity === null ? 1 : item.quantity);
    })
    .reduce((acc, cost) => acc + cost, 0);

  const sumCompletedBudgetItemsCost = budgetItems
    .filter(item => item.completed === 1)
    .map(item => {
      return item.cost * (item.quantity === null ? 1 : item.quantity);
    })
    .reduce((acc, cost) => acc + cost, 0);

  return {
    event_id: id,
    sum_total_items_cost:
      sumRemainingBudgetItemsCost + sumCompletedBudgetItemsCost,
    sum_completed_items_cost: sumCompletedBudgetItemsCost,
    sum_remaining_items_cos: sumRemainingBudgetItemsCost
  };
}

function getEventsAnalytics() {
  return getEvents()
    .count("* as count_events")
    .avg("budget as average_budget");
}
