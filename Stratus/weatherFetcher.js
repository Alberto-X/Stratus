function getWeather(app, apikey, location) {
    // Setup Parameters to retrieve data
    var args = {
        app: app,
        apikey: apikey,
        location: location
    }

    // Retrieve Data
    retrieveDataFromDarkSky(args);
}
module.exports = getWeather;

function retrieveDataViaPython(args) {
    var app = args.app;
    var API_KEY = args.API_KEY;
    var location = args.location;
    let Forecast = require('./dataModel');
    let Predictor = require('./predictor');

    var spawn = require('child_process').spawn;
    const scriptExecution = spawn(app.locals.PYTHON_PATH, ['dark_sky_data_grab.py', location[0], location[1]]);
    
    //Set listener to be executed when stdout is written to by python
    scriptExecution.stdout.on('data', function (rawdata) {
        console.log('>> Data retrieved via Python.');

        //Convert data from python to readable string
        let pyData = String.fromCharCode.apply(null, rawdata);
        var f = new Forecast(pyData).forecast;
        
        //Give data to Predictor/store prediction for power
        //var prediction = Predictor.predict(f, app);
        //f.power = prediction;

        //console.log(JSON.parse(pyData));
        if(app.locals.socket) {
            app.locals.socket.emit('ds-data', f);
        }

        // Request data after 5 seconds
        app.locals.weatherReqID = setTimeout(getWeather, 5000, app);
    })
}

function retrieveDataFromDarkSky(args) {
    var axios = require('axios');
    var Predictor = require('./predictor');
    var app = args.app;
    var apikey = args.apikey
    var coords = app.locals.LOCATIONS[args.location]   //lookup coordinates for given location

    axios({
        method: 'get',
        url: `https://api.darksky.net/forecast/${apikey}/${coords[0]},${coords[1]}`,
        params: {},
        responseType: 'json',
        timeout: 10000,
    }).then(function(response) {
        // DATA RECEIVED, then pretty-ify it
        console.log(`>> DarkSky polled. socket: ${app.locals.socket}`);
        var formattedData = processDarkSkyData(app, response.data);

        // SEND DATA TO PREDICTOR
        app.locals.predictReqID = setTimeout(Predictor.predict, 0, app, formattedData, args);
    }).catch(function(error) {
        console.log(error);
    })
}

function processDarkSkyData(app, jsonData) {
    var data = jsonData;
    var processed = {};

    // SELECT DATA based on FACTOR_LIST
    var currently = {};
    app.locals.FACTOR_LIST.map(function(factor) {
        currently[factor] = data.currently[factor];
    })
    var hourly = {};
    hourly.data = [];
    data.hourly.data.map(function(hourlyPred) {
        //for each hourly prediction, create a temp object
        var entry = {};
        app.locals.FACTOR_LIST.map(function(factor) {
            //for each factor, define new entry in temp object
            entry[factor] = hourlyPred[factor];
        })
        hourly.data.push(entry);
    })

    // REFORMAT TIME
    var tAdj = 1000;
    var date = new Date(currently.time * tAdj);
    var time = formatTime(date);
    var dateStr = date.toDateString();
    currently.time = time;
    currently.date = dateStr;

    hourly.data.forEach(function(hourlyPred) {
        date = new Date(hourlyPred.time * tAdj);
        time = formatTime(date);
        dateStr = date.toDateString();
        hourlyPred.time = time;
        hourlyPred.date = dateStr;
    })

    processed = {
        'currently': currently,
        'hourly' : hourly
    }
    return processed;
}

function formatTime(t){
    var hrs = t.getHours() + ":";
    var min = t.getMinutes() +":";
    var sec = t.getSeconds() + "";
    return hrs + min + sec;
}
