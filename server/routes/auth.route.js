const users = require("../app/controllers/auth.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/", users.login);
  router.get("/", users.verifyUser);
  // router.post('/manager', users.loginAsManager);
  app.use("/api/login", router);
};
