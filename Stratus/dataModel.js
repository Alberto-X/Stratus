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
module.exports = { WeatherData: WeatherData, Forecast: Forecast };