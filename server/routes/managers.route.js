const managers = require("../app/controllers/managers.controller");
const router = require("express").Router();

module.exports = (app) => {

    router.post("/", managers.createAccount);
    // router.get("/", residents.getResidents);

    app.use("/api/managers", router);
};
