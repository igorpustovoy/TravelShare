const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../mongo/models/User");

const JWT_SECRET = 'dsa!78979dh0(#$dsa9q2dhn9qchd90qh@#dhaspashdlaksd-3294c23u4209ncdna092';

//Only in development
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    res.json({ status: "error", error: "Invalid login information" });
  }

  if (await bcrypt.compare(password, user.password)) {
    
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
    
    return res.json({ status: "ok", data: token });

  }

  res.json({ status: "error", error: "Invalid login information" });

});

router.post("/register", async (req, res) => {
  const { username, email, age, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 15);
  console.log(hashedPassword);

  try {
    const user = await User.create({
      username,
      email,
      age,
      password: hashedPassword,
    });
    console.log("USER:", user);
    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ status: "error", message: "Username already taken" });
    } else {
      console.log(error);
      throw error;
    }
  }
});

module.exports = router;
