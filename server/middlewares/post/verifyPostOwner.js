const Post = require("../../models/Post");

const verifyPostOwner = async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (req.user.userId === post.userId) {
    next();
  } else {
    return res.status(403).json({ msg: "you are not authorized" });
  }
};

module.exports = verifyPostOwner;
