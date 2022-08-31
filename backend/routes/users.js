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

router.get("/username-taken", async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.json({ usernameTaken: true });
    } else {
      res.json({ usernameTaken: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: {userFound: false} });
  }

  if (await bcrypt.compare(password, user.password)) {
    
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
    
    return res.json({ status: "ok", token: token });

  }

  return res.json({ status: "error", error: {userFound: false} });

});

router.post("/register", async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  const hashedPassword = await bcrypt.hash(password, 15);
  console.log(hashedPassword);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phoneNumber
    });
    console.log("USER:", user);
    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ status: "error", error: {usernameTaken: true} });
    } else {
      console.log(error);
      throw error;
    }
  }
});

module.exports = router;
