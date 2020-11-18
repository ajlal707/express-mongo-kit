const express = require('express');
const MailENV = require('../config/mailEnv')
const nodemailer = require('nodemailer');
const User = require('../models/user')
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.post('/userSignup', async function (req, res) {
  let { email, username, password } = req.body;
  let user;
  user = await User.findOne({ username: username })
  if (user) return res.json({ error: 'Username already exist.' })

  user = await User.findOne({ email: email })
  if (user) return res.json({ error: 'email already exist.' })

  // let mailOptions = {
  //   from: MailENV.email.from,
  //   to: email,
  //   subject: MailENV.email.subject,
  //   html: `<p style="font-weight: bold;">Hi,</p>
  //         <p>We\'ve received a request to reset your password.
  //          If you didnt make this request, just ignore this email.
  //           Otherwise you can reset your password using the link below.</p>
  //           <p>Thanks</p><p>Khalis Group ltd</p><div style="text-align: center">
  //           <a style="color: white; text-decoration: underline; background: #d18e54; width: 250px; display: block; margin: auto; line-height: 25px; text-decoration: none; border-radius: 3px;"
  //            href="http://localhost:3000/">Click here to login.</a></div>`
  // };
  // var transporter = nodemailer.createTransport({
  //   service: MailENV.smtp.service,
  //   auth: {
  //     user: MailENV.smtp.user,
  //     pass: MailENV.smtp.pass
  //   }
  // });

  // transporter.sendMail(mailOptions, function (err, info) {
  //   console.log('=====',err)
  //   if (err) return res.json({ error: err })

  // });
  User.create({
    username: username,
    email: email,
    password: password,
    role: 'user',
    is_active: true,
    created_at: new Date()
  }, (err, user) => {
    if (err) return res.json({ error: err })

    return res.json({ success: 'success' })
  })
})



module.exports = router;
