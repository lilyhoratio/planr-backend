const db = require("../../data/dbConfig.js");

module.exports = {
  addEvent,
  getEventsBy,
  getEventById,
  getEventsByUserId,
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

function getEventsByUserId(userId) {
  return db("events AS e")
    .select("e.*", "u.name as user_name")
    .join("users_events AS ue", { "ue.event_id": "e.id" })
    .join("users AS u", "u.user_id", "eu.user_id")
    .where("eu.user_id", userId);
}

function getEventById(id) {
  return db("events")
    .where({ id })
    .first();
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
