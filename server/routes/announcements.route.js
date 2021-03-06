const announcement = require("../app/controllers/announcements.controller");
const router = require("express").Router();
const upload = require("../app/helpers/images");
const auth = require('../app/middleware/auth');

module.exports = (app) => {

    router.get("/", auth, announcement.getAllAnnouncements);
    router.post('/', [upload.single("image")], announcement.createAnnouncement);
    router.delete("/:id", announcement.deleteAnnouncement);
    // router.put("/:postId/comment", announcement.commentOnAnnouncement);
    // router.delete("/:postId/:commentId", post.deleteCommentOnPost);

    app.use("/api/announcement", router);
}