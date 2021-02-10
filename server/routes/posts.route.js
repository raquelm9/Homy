const post = require("../app/controllers/posts.controller");
const router = require("express").Router();

module.exports = (app) => {

    router.get("/", post.getAllPosts);
    router.post('/', post.createPost);
    router.delete("/:id", post.deletePost);
    router.put("/:postId/comment", post.commentOnPost);
    // router.delete("/:postId/:commentId", post.deleteCommentOnPost);
    
    app.use("/api/post", router);
}