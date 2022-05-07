const express = require("express");
const Post = require("../models/Post");
const verifyToken = require("../middlewares/verifyToken");
const verifyPostOwner = require("../middlewares/post/verifyPostOwner");

const router = express.Router();

//create post
router.post("/", verifyToken, async (req, res) => {
  req.body.userId = req.user.userId;
  let newPost = new Post(req.body);
  try {
    newPost = await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:postId", verifyToken, verifyPostOwner, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:postId", verifyToken, verifyPostOwner, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
