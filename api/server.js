const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const projectsRouter = require("../api/routers/projects/projectsRouter");
const actionsRouter = require("../api/routers/actions/actionsRouter");

const server = express();
server.use(cors());
server.use(express.json());
server.use(logger);
server.use(helmet());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send({
    Server: "Hi, I'm your Server.  Can I start you off with a drink?"
  });
});

function logger(req, res, next) {
  const { method, url } = req;
  console.log(
    `[${new Date().toLocaleTimeString()}] ${method} request to URL: ${url}`
  );
  next();
}

module.exports = server;
