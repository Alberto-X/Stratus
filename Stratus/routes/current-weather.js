'use strict';
var express = require('express');
var router = express.Router();

var PYTHON_PATH = 'python'  //path of python.exe, or just 'python' if in PATH variable
var refreshCounter = [];
var lat = 0,long = 0;

/* GET 'current weather' page. */
router.get('/', function (req, res) {
    GetDataFromPython(req, res);
});

//NOTE: need to use 'AXIOS' library to request data asynchronously, via url
function GetDataFromPython(req, res) {
    var spawn = require('child_process').spawn;
    const scriptExecution = spawn(PYTHON_PATH, ['dark_sky_data_grab.py',lat,long]);
    
    //Set listener to be executed when stdout is written to by python
    scriptExecution.stdout.on('data', function (rawdata) {
        //Convert data from python to readable string
        let pyData = String.fromCharCode.apply(null, rawdata);
        var forecast = JSON.parse(pyData);
        
        //console.log(pyData);
        console.log('python done.');

        res.render('current-weather', {
            url: req.path,
            title: 'Current Weather Data',
            description: 'displays weather data from right now',
            data: pyData,
            counter: 0
        })
    })
}

module.exports = router;
