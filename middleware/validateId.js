/* eslint-disable no-unused-expressions */
const Actions = require("../api/routers/actions/actionModel");
const Projects = require("../api/routers/projects/projectModel");

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { baseUrl } = req;

  if (baseUrl === "/api/actions") {
    Actions.get(id).then(action => {
      action
        ? next()
        : res.status(404).json({
            error: "The action with the specified ID does not exist."
          });
    });
  } else {
    Projects.get(id).then(project => {
      project
        ? next()
        : res.status(404).json({
            error: "The project with the specified ID does not exist."
          });
    });
  }
};
