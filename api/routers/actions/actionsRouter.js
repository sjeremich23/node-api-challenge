const router = require("express").Router();
const Actions = require("./actionModel");
const validateAction = require("../../../middleware/validateAction");
const validateId = require("../../../middleware/validateId");

// get
router.get("/", (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error:
          "Internal Error: Error retrieving(GET) the information from the database"
      });
    });
});

// get by ID
router.get("/:id", validateId, (req, res) => {
  const { id } = req.params;

  Actions.get(id)
    .then(actionId => {
      res.status(200).json({ actionId });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error:
          "Internal Error: Error retrieving(GET) the information from the entry ID in the database"
      });
    });
});

// insert
router.post("/", validateId, validateAction, (req, res) => {
  const { body } = req;

  Actions.insert(body)
    .then(action => {
      res
        .status(201)
        .json({ action, message: "Data entry successfuly entered" });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: "Internal Error: Error posting the information to the database"
      });
    });
});

// update
router.put("/:id", validateId, validateAction, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Actions.update(id, body)
    .then(action => {
      res.status(200).json({ action, message: "Updated successfully" });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: "Internal Error: Error updating the information to the database"
      });
    });
});

// remove
router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(() => {
      res.status(200).json({ message: `Action ${id} Removed successfully` });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error:
          "Internal Error: Error removing the information from the database"
      });
    });
});

module.exports = router;
