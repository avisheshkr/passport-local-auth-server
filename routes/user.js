const express = require("express");
const User = require("../models/user");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
  const { password, ...user } = req.user._doc;

  res.status(200).json({ success: true, user });
});

router.get("/allUsers", isAuthenticated, isAdmin, (req, res) => {
  User.find((err, user) => {
    if (err)
      return res
        .status(404)
        .json({ success: false, message: "Error finding users" });

    const users = user.map((u) => {
      const { password, ...userWithoutPassword } = u._doc;
      return userWithoutPassword;
    });

    res.status(200).json({ success: true, users });
  });
});

module.exports = router;
