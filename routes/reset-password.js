let express = require('express')
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
let ensureAuthenticated = require('../config/authUser')
let router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {

    res.render('reset-password', { title: 'Reset Password' })

})


router.post('/resetPassword', ensureAuthenticated, (req, res, next) => {

    let { oldPassword, password } = req.body
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) return res.json({ error: err })

        if (!user) return res.json({ error: 'Something happend bad please try again.' })

        bcrypt.compare(oldPassword, user.password, (error, matched) => {
            if (error) return res.json({ error: 'Something happend bad please try again.' })

            if(matched){
                user.password = password;
                user.save((err) => {
                    if (err) return res.json({ error: err })
    
                    return res.json({ success: 'success.' })
                })
            }else{
                 return res.json({ error: 'old password incorrect.' })
            }
        });
    })
})


module.exports = router;
