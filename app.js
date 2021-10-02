var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// EXPRESS SESSION 
const session = require("express-session");

const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const productsRouter = require("./routes/products");
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

// MIDDLEWARES 
const localsCheck = require("./middlewares/localsCheck");
const cookieCheck = require("./middlewares/cookieCheck"); // cookie-session 

var app = express();

// METHOD OVERRIDE 
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Agregar al session dos parametros adicionales, resave, saveUnitialized 
app.use(session({secret: "mv995", resave: true, saveUninitialized: true}));

app.use(localsCheck);
app.use(cookieCheck);

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use("/products", productsRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
