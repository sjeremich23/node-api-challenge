module.exports = (req, res, next) => {
  const { description, notes } = req.body;
  const projectID = req.body.project_id;

  if (!projectID || !description || !notes) {
    res.status(404).json({
      error:
        "project_id, description and notes are required to submit to database"
    });
  } else if (description.length > 128) {
    res
      .status(404)
      .json({ error: "Description is needs to be less than 128 characters" });
  } else {
    next();
  }
};
