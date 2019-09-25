const db = require("../../data/dbConfig.js");

module.exports = {
  addItem,
  getItemsBy,
  getItemById,
  getItems,
  updateItem,
  deleteItem
};

function getItems() {
  return db("shopping_list_items");
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
