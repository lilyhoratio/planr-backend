const db = require("../../data/dbConfig.js");

module.exports = {
  addItem,
  getItemsBy,
  getItemById,
  getItems,
  updateItem,
  deleteItem
};

function getItems(options) {
  // SELECT * FROM shopper_list_items ORDER BY ${sortBy} ${sortDir}
  let query = db("shopping_list_items");
  if (options.limit) {
    query = query.limit(parseInt(options.limit, 10));
  }

  if (options.sortBy) {
    query = query.orderBy(options.sortBy, options.sortDir || "DESC");
  }

  return query;
}

function getItemsBy(filter) {
  return db("shopping_list_items").where(filter);
}

function getItemById(id) {
  return db("shopping_list_items")
    .where({ id })
    .first();
}

function addItem(item) {
  return db("shopping_list_items")
    .insert(item, "id")
    .then(([id]) => getItemById(id));
}

function updateItem(changes, id) {
  return db("shopping_list_items")
    .where("id", id)
    .update(changes)
    .then(outcome => getItemById(id));
}

function deleteItem(id) {
  return db("shopping_list_items")
    .where("id", id)
    .del();
}
