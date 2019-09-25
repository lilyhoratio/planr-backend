const db = require("../../data/dbConfig.js");

module.exports = {
  addEvent,
  getEventsBy,
  getEventById,
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
