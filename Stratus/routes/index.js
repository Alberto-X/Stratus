'use strict';
var express = require('express');
var router = express.Router();
var x, y 
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        url: req.path,
        title: 'Stratus',
        description: "a predictor of solar power output",
        data: [["one"],["two"]]});
});

module.exports = router;
