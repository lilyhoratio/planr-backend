const db = require("../../data/dbConfig.js");

module.exports = {
  addVendor,
  getVendorsBy,
  getVendorById,
  getVendors,
  updateVendor,
  deleteVendor
};

// vendors
// 1) insert or get all vendors 2) use vendor_id to create budget item
// type in vendor name -
// 2) budget item - accept vendor name >>> look for vendor_name in vendors table and insert it and return id
// vendor name unique to event

// GET event data & vendor array - front end map over it
// Promise.all() // JSON aggregates
// {
// name,
// location,
// vendors: []
// }

function getVendors() {
  return db("vendors");
}

function getVendorsBy(filter) {
  return db("vendors").where(filter);
}

function getVendorById(id) {
  return db("vendors")
    .where({ id })
    .first();
}

function addVendor(vendor) {
  return db("vendors")
    .insert(vendor, "id")
    .then(([id]) => getVendorById(id));
}

function updateVendor(changes, id) {
  return db("vendors")
    .where("id", id)
    .update(changes)
    .then(outcome => getVendorById(id));
}

function deleteVendor(id) {
  return db("vendors")
    .where("id", id)
    .del();
}
