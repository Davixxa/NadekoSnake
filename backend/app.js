//Dependencies
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

//Local Dependencies
var sql = require('./comps/sql');

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var adminRouter = require('./routes/admin');
var orderRouter = require('./routes/order');

var app = express();

app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/order', orderRouter);

//app.listen(3000);

module.exports = app;