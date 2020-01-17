const router = require("express").Router();
const Projects = require("./projectModel");
const validateId = require("../../../middleware/validateId");

// get
router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json({ projects });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error:
          "Internal Error: Error retrieving the information from the database"
      });
    });
});

// get by ID
router.get("/:id", validateId, (req, res) => {
  const { id } = req.params;

  Projects.get(id)
    .then(projectId => {
      res.status(200).json({ projectId });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error:
          "Internal Error: Error retrieving the information from the entry ID in the database"
      });
    });
});

// getProjectActions
router.get("/:id/actions", validateId, (req, res) => {
  const { id } = req.params;

  Projects.getProjectActions(id)
    .then(projectActions => {
      res.status(200).json({ projectActions });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error:
          "Internal Error: Error retrieving the actions from the entry ID in the database"
      });
    });
});

// insert
router.post("/", (req, res) => {
  const { body } = req;

  Projects.insert(body)
    .then(project => {
      res
        .status(201)
        .json({ project, message: "Project entry successfuly entered" });
    })
    .catch(err => {
      res.status(500).json({ err, error: "Project entry unsuccessful" });
    });
});

// update
router.put("/:id", validateId, (req, res) => {
  const { name, description } = req.body;
  const { body } = req;

  if (name && description) {
    Projects.insert(body)
      .then(projectEntry => {
        res.status(201).json({
          projectEntry,
          message: "Project updated successfully entered"
        });
      })
      .catch(err => {
        res.status(500).json({ err, error: "Project update unsuccessful" });
      });
  } else {
    res.status(400).json({ error: "Name and Description are required" });
  }
});

// remove
router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(() => {
      res.status(200).json({ message: `Project ${id} Removed successfully` });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: "Internal Error: Error removing project from the database"
      });
    });
});

module.exports = router;
