const auth = require("../app/middleware/auth");
const manager = require("../app/middleware/manager");
const shop = require("../app/controllers/shop.controller");
const router = require("express").Router();
const upload = require("../app/helpers/images");

module.exports = (app) => {
  router.post("/pay", auth, shop.payment);
  router.post("/products", upload.single("image"), shop.createProduct);
  router.get("/products", auth, shop.getProducts);
  router.get("/orders", [auth, manager], shop.getOrders);
  router.delete("/orders/:id", shop.deleteOrder);
  app.use("/api/shop", router);
};
