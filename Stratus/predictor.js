module.exports = {
    predict: function(forecast, app){
        // USE NEURAL NET to predict power output
        var spawn = require('child_process').spawn;
        const scriptExecution = spawn(app.locals.PYTHON_PATH, ['neural_net_data.py', forecast]);
        
        //Set listener to be executed when stdout is written to by python
        scriptExecution.stdout.on('data', function (rawdata) {
            console.log('>> Neural net completed.');
    
            //Convert data from python to readable string
            let neuralNetData = String.fromCharCode.apply(null, rawdata);
            console.log('>> NNData: ' + neuralNetData)
            
            return {
                power: extractPowerFromNNData(neuralNetData)
            }
        });
    }
}

function extractPowerFromNNData(nnData) {
    return nnData;
}