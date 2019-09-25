const express = require("express");

const Vendors = require("./vendors-model.js");

const router = express.Router();

// GET /api/vendors
router.get("/", (req, res) => {
  Vendors.getVendors()
    .then(vendors => {
      res.status(200).json(vendors);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while getting all vendors.", err });
    });
});

// GET /api/vendors/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Vendors.getVendorById(id)
    .then(vendor => {
      if (vendor) {
        res.status(200).json(vendor);
      } else {
        res.status(404).json({ message: `No vendor with the id ${id} found.` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while getting vendor by id.", err });
    });
});

// POST /api/vendors
router.post("/", (req, res) => {
  const vendor = req.body;

  Vendors.addVendor(vendor)
    .then(newVendor => {
      res.status(201).json(newVendor);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while adding a new vendor.", err });
    });
});

// PUT /api/vendors/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Vendors.updateVendor(changes, id)
    .then(vendor => {
      res.status(200).json(vendor);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while updating vendor.", err });
    });
});

// DELETE /api/vendors/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Vendors.deleteVendor(id)
    .then(outcome => {
      if (outcome) {
        res
          .status(200)
          .json({ message: `Vendor with the id ${id} successfully deleted.` });
      } else {
        res
          .status(404)
          .json({ message: `Vendor with id ${id} does not exist.` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while deleting vendor.", err });
    });
});

module.exports = router;
