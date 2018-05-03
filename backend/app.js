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

var app = express();

app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);

module.exports = app;