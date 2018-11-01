function WeatherData(time, temp, cld, ozn){
    this.day;
    this.time;
    this.temp = temp;
    this.cldCvr = cld;
    this.ozone = ozn;
    setTime(new Date(time * 1000));

    function setTime(x){
        var hrs = x.getHours() + ":";
        var min = x.getMinutes() +":";
        var sec = x.getSeconds() + "";

        this.day = x.toDateString();
        this.time = hrs + min + sec;
    }

    function getData(){
        return {"day":this.day, "time":this.time,
         "temp":this.temp, "cloud":this.cldCvr, "ozone":this.ozone};
    }
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

    function changeHour(inc){
        this.tracker += inc;
        if(this.mode = "hourly"){
            this.data = this.hourly[this.tracker];
        }
    }

    function getForecastJSON(){
        var ret;

        ret.hourly = [];
        ret.currently = this.current.getData();

        for(var x in this.hourly){
            ret.hourly.push(x.getData());
        }

        return JSON.stringify(ret);
    }
}
module.exports = { WeatherData: WeatherData, Forecast: Forecast };