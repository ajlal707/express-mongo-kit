let express = require('express');
const User = require('../models/user')
const ensureAuthenticated = require('../config/authUser')
let router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, async function (req, res, next) {
   
    let user = await User.findOne({ _id: req.user._id }).populate('photoId')

    res.render('dashboard', { title: 'Dashboard', user })
});

module.exports = router;
