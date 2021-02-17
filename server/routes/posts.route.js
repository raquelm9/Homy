const post = require("../app/controllers/posts.controller");
const router = require("express").Router();
const upload = require("../app/helpers/images");

module.exports = (app) => {

    router.get("/", post.getAllPosts);
    router.post('/', [upload.single("image")], post.createPost);
    router.delete("/:id", post.deletePost);
    router.put("/:postId/comment", post.commentOnPost);
    // router.delete("/:postId/:commentId", post.deleteCommentOnPost);

    app.use("/api/post", router);
}