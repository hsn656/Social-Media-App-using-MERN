const Post = require("../../models/Post");

const verifyPostOwner = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      res.status(404).json({ message: "post not found" });
    } else if (req.user.userId === post?.userId) {
      next();
    } else {
      return res.status(403).json({ msg: "you are not authorized" });
    }
  } catch (error) {
    res.status(500).json("server error");
  }
};

module.exports = verifyPostOwner;
  