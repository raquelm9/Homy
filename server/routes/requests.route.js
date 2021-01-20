const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });




module.exports = (app) => {

  const auth = require('../app/middleware/auth');

  const request = require("../app/controllers/requests.controller");

  const router = require("express").Router();

  router.delete("/:id", auth, request.deleteRequest)

  router.post("/", [auth, upload.single("image")], request.createRequest);

  router.get("/", auth, request.getRequest);

  app.use("/api/service-requests", router);
};

