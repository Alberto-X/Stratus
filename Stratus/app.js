'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// ROUTES
var routes = require('./routes/index');
var past_weather = require('./routes/past-weather');

var app = express();

// VIEW ENGINE setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// MIDDLEWARE
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/past-weather', past_weather);

// ERROR HANDLING
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler -> prints stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler -> no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// SET PORT
app.set('port', process.env.PORT || 1338);

// START SERVER
var server = app.listen(app.get('port'), function (err) {
    if (err) {
        return console.log(`>>ERROR: ${err.message}`);
    }
    console.log('Express server listening on port ' + server.address().port);
});
