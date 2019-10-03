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
  return db("users").select("id", "name", "email", "role_id");
}

function getUsersBy(filter) {
  return db("users").where(filter);
}

function getUserById(id) {
  const userQuery = getUsers()
    .where({ id })
    .first();

  const roleQuery = getRoleByUserId(id);
  const eventsQuery = getEventsCreatedbyUserId(id);
  return Promise.all([userQuery, roleQuery, eventsQuery]).then(
    ([user, role, createdEvents]) => {
      if (user) {
        user.role_name = role.role_name;
        user.createdEvents = createdEvents;
        return user;
      } else {
        return null;
      }
    }
  );
}

function getEventsCreatedbyUserId(id) {
  return db("users AS u")
    .select("e.id as event_id", "e.name as event_name")
    .leftJoin("events AS e", { "e.created_by": "u.id" })
    .where({ "u.id": id });
}

function getRoleByUserId(id) {
  return db("users AS u")
    .select("r.name AS role_name")
    .join("roles AS r", { "r.id": "u.role_id" })
    .where({ "u.id": id })
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => getUserById(id));
}

// event exists
// on invite acceptance, insert user into users table >> user created successfully
// accepted invite, insert user into user_events - pending

function updateUser(changes, id) {
  return db("users")
    .where("id", id)
    .update(changes)
    .then(_ => getUserById(id));
}

function deleteUser(id) {
  return db("users")
    .where("id", id)
    .del();
}
