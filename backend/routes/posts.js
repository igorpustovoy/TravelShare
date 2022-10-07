const express = require("express");
const router = express.Router();

const Post = require("../mongo/models/Post");
const User = require("../mongo/models/User");

const JWT_SECRET =
  "dsa!78979dh0(#$dsa9q2dhn9qchd90qh@#dhaspashdlaksd-3294c23u4209ncdna092";

const authMiddleware = (req, res, next) => {
    const authHeader = req.get("Authorization");

    console.log(authHeader);

    next();
}

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { description, authorId, image } = req.body;

  try {
    const author = await User.findById(authorId);
    if (author) {
      const post = new Post({ description, authorId, image });
      await post.save();
      res.json({
        status: "ok",
        post: {
          id: post._id,
          description: post.description,
          authorId: post.authorId,
          image: post.image,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
