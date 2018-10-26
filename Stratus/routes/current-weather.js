'use strict';
var express = require('express');
var router = express.Router();

var PYTHON_PATH = 'python'  //path of python.exe, or just 'python' if in PATH variable
var refreshCounter = [];
var lat = 0,long = 0;

function WeatherData(time, temp, cld, ozn){
    this.time = time;
    this.temp = temp;
    this.cldCvr = cld;
    this.ozone = ozn;
}

function Forecast(json){
    var c = json.currently;
    this.current = new WeatherData(c.time, c.temp, c.cloud, c.ozone);
    this.hourly = [];
    this.tracker = 0;
    this.mode = "current";
    this.data = this.current;
    for(var x in json.hourly){
        x = json.hourly[i];
        this.hourly.push(new WeatherData(x.time, x.temp, x.cloud, x.ozone));
    }

    function changeMode(){
        if(this.mode == "current"){
            this.mode = "hourly";
            this.data = this.hourly[this.tracker];
        } else {
            this.mode = "current";
            this.data = this.current;
        }
    }

    function nextHour(inc){
        this.tracker += inc;
        if(this.mode = "hourly"){
            this.data = this.hourly[this.tracker];
        }
    }
}
/* GET 'past weather' page. */
router.get('/', function (req, res) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        var data = new Forecast(forecast);
        
        console.log(pyData);
        console.log('python done.');

        res.render('current-weather', {
            url: req.path,
            title: 'Current Weather Data',
            description: 'displays weather data from right now',
            data: pyData,
        })
    })
}

module.exports = router;
