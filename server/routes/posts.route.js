const post = require("../app/controllers/posts.controller");
const router = require("express").Router();
const upload = require("../app/helpers/images");
const auth = require('../app/middleware/auth');

module.exports = (app) => {

    router.get("/", auth, post.getAllPosts);
    router.post('/', [upload.single("image")], post.createPost);
    router.delete("/:id", post.deletePost);
    router.put("/:postId/comment", post.commentOnPost);
    // router.delete("/:postId/:commentId", post.deleteCommentOnPost);

    app.use("/api/post", router);
}