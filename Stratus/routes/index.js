'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        url: req.path,
        title: 'Stratus',
        description: "a predictor of solar power output" });
});

module.exports = router;
