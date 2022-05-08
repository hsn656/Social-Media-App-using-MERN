const Post = require("../models/Post");

const createPost = async (req, res) => {
  req.body.userId = req.user.userId;
  let newPost = new Post(req.body);
  try {
    newPost = await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.user.userId)) {
      await post.updateOne({ $push: { likes: req.user.userId } });
      res.status(200).json({ message: "The post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.user.userId } });
      res.status(200).json({ message: "The post has been disliked" });
    }
  } catch (error) {
    res.status(500).json("server error");
  }
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
  likePost,
};
