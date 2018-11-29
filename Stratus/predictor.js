module.exports = {
    predict: function(app, forecast, fetcherArgs){
        var weatherFetcher = require('./weatherFetcher');

        // USE NEURAL NET to predict power output
        var spawn = require('child_process').spawn;
        const scriptExecution = spawn(app.locals.PYTHON_PATH, ['neural_net_test.py', JSON.stringify(forecast)]);
        
        //Set listener to be executed when python outputs to stdout
        scriptExecution.stdout.on('data', function (rawdata) {
            console.log('>> Neural net completed.');
    
            //Convert data from python to readable string
            let neuralNetData = String.fromCharCode.apply(null, rawdata);
            
            // EXTRACT POWER from NN data
            var currentPower = extractCurrentPowerFromNNData(neuralNetData);    //float
            var hourlyPower = extractHourlyPowerFromNNData(neuralNetData);      //list of float

            // STORE POWER in weather data
            forecast.currently.power = currentPower;
            var i = 0;
            hourlyPower.forEach(function(pwr, index) {
                forecast.hourly.data[index].power = pwr;
            })

            // SEND ALL DATA TO BROWSER via socket
            if(app.locals.socket) {
                app.locals.socket.emit('ds-data', JSON.stringify(forecast));
            }

            // REQUEST WEATHER DATA after 10 seconds
            app.locals.weatherReqID = setTimeout(weatherFetcher, 10000, app, fetcherArgs.apikey, fetcherArgs.location);
        });
    }
}

function extractCurrentPowerFromNNData(nnData) {
    var data = nnData.split('\n')[0]
    return parseFloat(data);
}

function extractHourlyPowerFromNNData(nnData) {
    var data = nnData.split('\n')[1];
    return JSON.parse(data);
}