require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require("./models");
var indexRouter = require('./routes/index');
var jobRouter = require('./routes/job.route');

var app = express();

try {
    const syncDB = db.sequelize.sync()
    console.log("Synced db.");
} catch (err) {
    console.log("Failed to sync db: " + err.message);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/job', jobRouter);

module.exports = app;
