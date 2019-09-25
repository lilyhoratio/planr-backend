const express = require("express");

const Items = require("./items-model.js");
const Validate = require("../middleware/validation-middleware.js");

const router = express.Router();

// GET /api/items
router.get("/", (req, res) => {
  Items.getItems()
    .then(items => {
      let formattedItems = items.map(item => {
        return {
          ...item,
          completed: item.completed ? true : false
        };
      });

      res.status(200).json(formattedItems);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error occurred while getting all items.", err });
    });
});

// GET /api/items/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Items.getItemById(id)
    .then(item => {
      if (item) {
        let formattedItem = {
          ...item,
          completed: item.completed ? true : false
        };

        res.status(200).json(formattedItem);
      } else {
        res.status(404).json({ message: `No item with the id ${id} found.` });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error occurred while getting item by id.", err });
    });
});

// POST /api/items/
router.post("/", (req, res) => {
  const item = req.body;

  Items.addItem(item)
    .then(newItem => {
      let formattedItem = {
        ...newItem,
        completed: newItem.completed ? true : false
      };

      res.status(201).json(formattedItem);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error occurred while adding a new item.", err });
    });
});

// PUT /api/items/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Items.updateItem(changes, id)
    .then(item => {
      let formattedItem = {
        ...item,
        completed: item.completed ? true : false
      };

      res.status(200).json(formattedItem);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error occurred while updating item.", err });
    });
});

// DELETE /api/items/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Items.deleteItem(id)
    .then(outcome => {
      if (outcome) {
        res
          .status(200)
          .json({ message: `Item with the id ${id} successfully deleted.` });
      } else {
        res.status(404).json({ message: `Item with id ${id} does not exist.` });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error occurred while deleting item.", err });
    });
});

module.exports = router;
