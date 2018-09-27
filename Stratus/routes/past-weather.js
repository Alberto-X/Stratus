'use strict';
var express = require('express');
var router = express.Router();

var PYTHON_PATH = 'python'  //path of python.exe, or just 'python' if in PATH variable
var myData;
var pythonCalcRenderInProgress = false;
var refreshCounter = [];

/* GET 'past weather' page. */
router.get('/', function (req, res) {
    if (!pythonCalcRenderInProgress) {
        //Call python if cycle of calculate/render not already in progress
        myData = null;
        pythonCalcRenderInProgress = true;
        refreshCounter = [];
        GetDataFromPython(req, res);
    }
    if (myData) {
        //Render final data returned by python
        res.render('past-weather', {
            url: req.path,
            title: 'Historic Weather Data',
            description: 'displays weather data from the past',
            data: myData
        })
        pythonCalcRenderInProgress = false;
    } else {
        //Render loading message while python executing
        res.render('past-weather', {
            url: req.path,
            title: 'Historic Weather Data',
            description: 'displays weather data from the past',
            data: 'REFRESH to view data from python...',
            refr_count: refreshCounter
        })
        refreshCounter.push(1);
    }
});

//NOTE: need to use 'AJAX' library to CONTINUOUSLY update data on webpage
function GetDataFromPython(req, res) {
    var spawn = require('child_process').spawn;
    const scriptExecution = spawn(PYTHON_PATH, ['data-retriever.py','arg1', 'arg2']);
    
    //Set listener to be executed when stdout is written to by python
    scriptExecution.stdout.on('data', function (rawdata) {
        //Convert data from python to readable string
        let pyData = String.fromCharCode.apply(null, rawdata);
        myData = pyData;
        console.log('python done.');
    })
}

module.exports = router;
