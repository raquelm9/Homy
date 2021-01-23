const shop = require("../app/controllers/shop.controller");
const router = require("express").Router();

module.exports = (app) => {

    router.post("/pay", shop.payment);

    app.use("/api/shop", router);
};
