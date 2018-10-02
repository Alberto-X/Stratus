'use strict';
var express = require('express');
var app = express();
var router = express.Router();
var axios = require('axios');

var PYTHON_PATH = 'python'  //path of python.exe, or just 'python' if in PATH variable
var refreshCounter = [];

/* GET 'past weather' page. */
router.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //Render web page
    res.render('past-weather', {
        url: req.path,
        title: 'Historic Weather Data',
        description: 'displays weather data from the past',
        data: {},
        refr_count: refreshCounter
    })
    refreshCounter.push(1);
});

//NOTE: need to use 'AXIOS' library to request data asynchronously, via url
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
