'use strict';
var express = require('express');
var router = express.Router();

var weatherFetcher = require('../weatherFetcher')

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        url: req.path,
        title: 'Stratus',
        description: "a predictor of solar power output",
        data: [["one"],["two"]],
    });
});

router.post('/', function (req, res) {
    if (req.body.apikey && req.body.location) {
        // CANCEL any unfinished requests for weather data or predictions
        clearTimeout(req.app.locals.weatherReqID);
        //clearTimeout(req.app.locals.predictReqID);
        
        // FETCH WEATHER data with given params  (wait a bit so constants can be sent via socket)
        req.app.locals.weatherReqID = setTimeout(weatherFetcher, 500, req.app, req.body.apikey, req.body.location);
    }

    res.render('index', {
        url: req.path,
        title: 'Stratus',
        description: "a predictor of solar power output",
        data: [["post"],["received"]]});
})

module.exports = router;
