const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).json({ success: false, message: "Authentication failed" });
  }
};

const isAdmin = (req, res, next) => {
  if (isAuthenticated && req.user.admin === true) {
    next();
  } else {
    res.status(403).json({ success: false, message: "You are not authorized" });
  }
};

module.exports = { isAuthenticated, isAdmin };
