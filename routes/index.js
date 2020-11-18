let express = require('express');
const passport = require('passport')
const jwt = require('../config/jwt')
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('login', function (err, user, info) {
    if (err) { return next(err) }

    if (!user) return res.json({ error: info.error })


    const token = jwt.createToken(user._id)
    user.token = token
    user.save((err) => {
      if (err) return res.json({ error: 'something happen bad.' })

      req.logIn(user, function (err) {
        if (err) return next(err);

        return res.json({ success: req.user })
      })
    })
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
