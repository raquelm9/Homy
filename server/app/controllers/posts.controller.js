const { Post } = require("../models/post.model");

exports.getAllPosts = (req, res) => {
  Post.find().then((data) => res.send(data));
};

exports.createPost = async (req, res) => {
  const file = req.file;
  const path = file ? file.path : undefined;

  console.log(req.body);
  // const path = file ? file.path : undefined;
  const post = new Post({
    date: req.body.date,
    // user_id: req.user._id,
    username: req.body.username,
    avatarUrl: req.body.avatarUrl,
    image: path,
    // imageUrl: req.body.imageUrl,
    caption: req.body.caption,
    comment: req.body.comment,
    isManager: req.body.isManager,
  });

  post.save().then((data) => res.send(data));
};

exports.deletePost = async (req, res) => {
  const PostId = req.params.id;
  let post = await Post.findById(PostId);
  if (!post) return res.status(404).send("The post was not found");

  post = await Post.deleteOne({ _id: PostId });
  if (!post) return res.status(404).send("The post was not found");
  res.send(post);
};

exports.commentOnPost = async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  if (!post) return res.status(404).send("The post was not found");

  if (!post.comments) {
    post.comments = [];
  }

  post.comments.push({
    username: req.body.name,
    comment: req.body.comment,
  });

  await post.save();

  return res.status(200).send(post);
};

// exports.deleteCommentOnPost = async (req, res) => {
//   const PostId = req.params.postId;
//   const CommentId = req.params.commentId;
//   let post = await Post.findById(PostId);
//   if (!post) return res.status(404).send("The post was not found");

//   let comment = await post.comments.findById(CommentId)
//   if (!comment) return res.status(404).send("The comment was not found");

//   comment = await post.comments.deleteOne({_id: CommentId});
//   if (!comment) return res.status(404).send("The comment was not found");

//   res.send(post);
// };
