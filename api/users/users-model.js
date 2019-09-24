const db = require("../../data/dbConfig.js");

module.exports = {
  addUser,
  getUsersBy,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
};

function getUsers() {
  return db("users").select("id", "name", "email", "company", "role");
}

function getUsersBy(filter) {
  return db("users").where(filter);
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .select("id", "name", "email", "company", "role")
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => getUserById(id));
}

function updateUser(changes, id) {
  return db("users")
    .where("id", id)
    .update(changes)
    .then(outcome => getUserById(id));
}

function deleteUser(id) {
  return db("users")
    .where("id", id)
    .del();
}
