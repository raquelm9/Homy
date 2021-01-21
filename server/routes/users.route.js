const users = require("../app/controllers/users.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/", users.register);

  app.use("/api/users", router);
};
