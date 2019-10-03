const db = require("../../data/dbConfig.js");
const Events = require("../events/events-model.js");

module.exports = {
  getEventsMetrics,
  getBudgetItemsMetrics,
  getBudgetItemsCostByEventId
};

function getEventsMetrics() {
  return db("events")
    .count("* as count_events")
    .avg("budget as average_budget");
}

function getBudgetItemsMetrics() {
  return db.raw(
    `
    WITH total_cost_per_item AS (
      SELECT 
          id,
          name,
	  	COALESCE(quantity, 1) * cost AS total_cost
      FROM budget_items
      GROUP BY id
      )
      SELECT 
          COUNT(id) AS count_budget_items,
          ROUND(total_cost / COUNT(id),2) AS average_cost_per_item
      FROM total_cost_per_item
	  GROUP BY total_cost_per_item.total_cost
  `
  );
}

async function getBudgetItemsCostByEventId(id) {
  const budgetItems = await Events.getBudgetItemsByEventId(id);
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
