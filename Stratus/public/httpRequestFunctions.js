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

    /*axios({
        method: 'get',
        url: 'https://api.darksky.net/forecast/'+API_KEY_DARKSKY+'/' +LOCATIONS[location.value],
        headers: {
            'Access-Control-Allow-Origin': '*', //?
            'Access-Control-Allow-Credentials': true, //?
        },
        params: {},
        responseType: 'json',
        timeout: 10000,
        proxy: {
            host: 'https://api.darksky.net'
        }
    }).then(function(response) {
        console.log(response.data);
        let darkSkyData = document.getElementById('dark-sky-data')
        let counterData = document.getElementById('counter')
        let liveRefresh = document.getElementById('input-live-refresh')
        
        if (liveRefresh.checked) {
            darkSkyData.innerHTML = response.data;
            counterData.innerHTML = counter + ']';
            counter += 1;
            setTimeout(getData, 5000);
        }
    }).catch(function(error) {
        console.log(error);
    })*/
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