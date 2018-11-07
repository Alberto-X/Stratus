//var axios = require('axios');
const API_KEY_DARKSKY = '1ebe35348caf124d5d1eb18889ec9376';
const LOCATIONS = {
    'babcock': '26.862517,-81.745393',
    'mountainview': '36.4025138,-114.9212876',
    'westside': '36.3866953,-120.140918'
}

var counter = 1;

function getData(){
    let location = document.getElementById('input-location');
    console.log(location.value);

    //GetDataFromPython(location, 0);
}

function GetDataFromPython(req, res) {
    var spawn = require('child_process').spawn;
    const scriptExecution = spawn(PYTHON_PATH, ['dark_sky_data_grab.py','arg1', 'arg2']);
    
    //Set listener to be executed when stdout is written to by python
    scriptExecution.stdout.on('data', function (rawdata) {
        //Convert data from python to readable string
        let pyData = String.fromCharCode.apply(null, rawdata);
        myData = pyData;
        console.log(pyData);
        console.log('python done.');
    })
}

function updateLocation(location) {
    console.log(location.value);
    
    $(document).ready(function() {
        socket.emit('location', location.value);
    })
}

function updateDarkSkyData() {

}