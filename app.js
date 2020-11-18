let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const mongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')

let indexRouter = require('./routes/index');
let usersSignup = require('./routes/signup');
let usersDashboard = require('./routes/dashboard');
let usersProfile = require('./routes/profile');
let usersResetPassword = require('./routes/reset-password');

let app = express();

// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./config/passport')(passport)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser({limit: '15mb'}));
app.use(session({
  secret: 'codeXekReT',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 86400000 }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', usersSignup);
app.use('/dashboard', usersDashboard);
app.use('/profile', usersProfile);
app.use('/reset-password', usersResetPassword);

mongoose.connect('mongodb://127.0.0.1:27017/attendance')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Successfully connected to MongoDB server!')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
