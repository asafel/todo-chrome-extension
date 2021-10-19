var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(3000, function () {
    console.log('Example app listening on port ' + 3000 + '!');
});

module.exports = app;
