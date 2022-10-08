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
    console.log(author);
    if (author) {
      const post = await Post.create({ description, author: author._id, image });
      console.log(post);
      return res.json({
        status: "ok",
        post: {
          id: post._id,
          description: post.description,
          authorId: post.author,
          image: post.image,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

module.exports = router;
