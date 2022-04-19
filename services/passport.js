const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");           //pulls the model out of mongoose - one arg

passport.serializeUser((user, done) => {        //makes cookies from users
    done(null, user.id);
})

passport.deserializeUser((id, done) => {        //translates cookies back into users
    User.findById(id)
    .then(user => {
        done(null, user)
    })
})


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
            }
    });
    }
  )
);
