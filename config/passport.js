const passport = require('passport')
const bcrypt = require('bcrypt-nodejs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = function () {
  console.log("i am in.")
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
  // PASSPORT LOCAL STRATEGY
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ $or: [{ email: email }, { username: email }] }, function (err, user) {
      if (err)
        return done(err)

      if (!user) return done(null, false, { message: 'Invalid credentials / you are not an admin.' }) // req.flash is the way to set flashdata using connect-flash

      bcrypt.compare(password, user.password, (error, matched) => {
        if (error) return done(error)

        if (matched) return done(null, user)

        return done(null, false, { error: 'Invalid password.' })
      });
    })
  }))
}
