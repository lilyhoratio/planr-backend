const express = require("express");
const Items = require("./items-model.js");
const Validate = require("../middleware/validation-middleware.js");

const router = express.Router();

/**
 * @api {get} /budget-items Get budget items
 * @apiName GetBudgetItems
 * @apiGroup Budget Items
 *
 * @apiParam (Query string) {Integer} limit Provide limit count to rows.
 * @apiParam (Query string) {String} sortBy Sort rows by column specified.
 * @apiParam (Query string) {String} sortDir Order rows by ascending (ASC) or descending (DESC) by default.
 * @apiParam (Query string) {Example} EXAMPLE
 * ```
 * /budget-items?limit=5&sortDir=ASC&sortBy=cost
 * ```
 * Queries budget_items as follows:
 * ```
 * SELECT *
 * FROM budget_items
 * ORDER BY cost ASC
 * LIMIT 5
 * ```
 *
 * @apiSuccess {Object[]} budget-items Array of budget items (dynamically queried based on query params)
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK (GET /api/budget-items?limit=2&sortBy=name&sortDir=asc)
 * [
 *   {
 *     "id": 5,
 *     "name": "Burritos",
 *     "quantity": 30,
 *     "cost": 10,
 *     "completed": false,
 *     "event_id": 3,
 *     "vendor_id": 2
 *   },
 *   {
 *     "id": 3,
 *     "name": "Business catering package",
 *     "quantity": 1,
 *     "cost": 600,
 *     "completed": false,
 *     "event_id": 1,
 *     "vendor_id": 2
 *   }
 * ]
 */

router.get("/", (req, res) => {
  console.log(req.query);
  const { limit, sortBy, sortDir } = req.query;
  Items.getItems({ limit, sortBy, sortDir })
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
