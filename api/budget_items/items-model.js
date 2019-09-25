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
  return db("items");
}

function getItemsBy(filter) {
  return db("items").where(filter);
}

function getItemById(id) {
  return db("items")
    .where({ id })
    .first();
}

function addItem(item) {
  return db("items")
    .insert(item, "id")
    .then(([id]) => getItemById(id));
}

function updateItem(changes, id) {
  return db("items")
    .where("id", id)
    .update(changes)
    .then(outcome => getItemById(id));
}

function deleteItem(id) {
  return db("items")
    .where("id", id)
    .del();
}
