const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(404).json({
        success: false,
        message: "Please provide a username and password",
      });
    }

    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({ username, password: hash });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ success: true, message: "Logged in successfully" });
});

router.get("/logout", isAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, message: "Error logging out" });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
});

module.exports = router;
