
const auth = require("../app/middleware/auth");
const manager = require("../app/middleware/manager");
const request = require("../app/controllers/requests.controller");
const router = require("express").Router();
const upload = require("../app/helpers/images");

module.exports = (app) => {
  router.delete("/:id", auth, request.deleteRequest);
  router.post("/", [auth, upload.single("image")], request.createRequest);
  router.put("/:requestId/comment", auth, request.commentOnRequest);
  router.put(
    "/:requestId/comment/manager",
    [auth, manager],
    request.commentOnRequestAsManager
  );
  // router.get()
  router.put(
    "/:requestId/status/manager",
    [auth, manager],
    request.updateStatusOnRequestAsManager
  );
  router.put(
    "/:requestId/status",
    auth,
    request.updateStatusOnRequest
  );
  router.get('/:id', auth, request.getRequestById)
  router.get("/", auth, request.getRequest);

  router.get(
    "/manager/all-service-requests",
    auth,
    request.getAllServiceRequests
  );
  router.get("/notification/:token", request.authNotification);

  app.use("/api/service-requests", router);
};
