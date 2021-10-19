const express = require('express');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(3000, function () {
    console.log('Task app listening on port ' + 3000 + '!');
});

module.exports = app;
