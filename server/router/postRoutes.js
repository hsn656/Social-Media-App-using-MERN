const express = require("express");
const Post = require("../models/Post");
const verifyToken = require("../middlewares/verifyToken");
const verifyPostOwner = require("../middlewares/post/verifyPostOwner");
const PostController = require("../controllers/postController");

const router = express.Router();

//create post
router.post("/", verifyToken, PostController.createPost);

//get all posts
router.get("/", PostController.getAll);

//get post by id
router.get("/:postId", PostController.getById);

//update post
router.put("/:postId", verifyToken, verifyPostOwner, PostController.updatePost);

//delete post
router.delete(
  "/:postId",
  verifyToken,
  verifyPostOwner,
  PostController.deletePost
);

//like post
router.put("/:postId/like", verifyToken, PostController.likePost);

module.exports = router;
