const db = require("../../data/dbConfig.js");

module.exports = {
  getEventsByUserId
};

function getEventsByUserId(userId) {
  return db("events AS e")
    .select("e.*", "u.name as user_name")
    .join("users_events AS ue", { "ue.event_id": "e.id" })
    .join("users AS u", "u.id", "ue.user_id")
    .where("ue.user_id", userId);
}
