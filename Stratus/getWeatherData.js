function getWeatherData(app) {
    // Setup Parameters to retrieve data
    var args = {
        app: app,
        API_KEY: app.locals.API_KEY_DARKSKY,
        location: app.locals.LOCATIONS[app.locals.location]
    }

    // Retrieve Data
    //retrieveDataFromDarkSky(args);
    retrieveDataViaPython(args);
}
module.exports = getWeatherData;

function retrieveDataViaPython(args) {
    var app = args.app;
    var API_KEY = args.API_KEY
    var location = args.location;
    var Forecast = require('./dataModel');

    var spawn = require('child_process').spawn;
    const scriptExecution = spawn(app.locals.PYTHON_PATH, ['dark_sky_data_grab.py', location[0], location[1]]);
    
    //Set listener to be executed when stdout is written to by python
    scriptExecution.stdout.on('data', function (rawdata) {
        console.log('>> Data retrieved via Python.');

        //Convert data from python to readable string
        let pyData = String.fromCharCode.apply(null, rawdata);
        var forecast = processDarkSkyData(JSON.parse(pyData));
        
        //var data = new Forecast(forecast);
        if(app.locals.socket) {
            app.locals.socket.emit('ds-data', forecast);
        }

        // Request data after 5 seconds
        app.locals.getDataReqID = setTimeout(getWeatherData, 5000, app);
    })
}

function retrieveDataFromDarkSky(args) {
    var axios = require('axios');
    var app = args.app;
    var API_KEY = args.API_KEY
    var location = args.location;

    axios({
        method: 'get',
        url: `https://api.darksky.net/forecast/${API_KEY}/${location[0]},${location[1]}`,
        params: {},
        responseType: 'json',
        timeout: 10000,
    }).then(function(response) {
        console.log(`>> DarkSky polled. socket: ${app.locals.socket}`);
        var formattedData = processDarkSkyData(response.data);

        if(app.locals.socket) {
            app.locals.socket.emit('ds-data', formattedData);
        }

        // Request data after 10 seconds
        app.locals.getDataReqID = setTimeout(getWeatherData, 10000, app);
    }).catch(function(error) {
        console.log(error);
    })
}

function processDarkSkyData(data) {

    return JSON.stringify(data);
}