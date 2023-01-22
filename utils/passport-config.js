const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({ username: "username" }, (username, password, done) => {
    User.findOne({ username }, async (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false);

      const passMatch = await bcrypt.compare(password, user.password);

      if (!passMatch) return done(null, false);

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);

    return done(null, user);
  });
});
