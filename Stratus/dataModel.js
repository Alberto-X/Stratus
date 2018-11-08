function Forecast(f){
    const tAdj = 1000;
    var json = JSON.parse(f);
    this.current = new WeatherData(json.currently);
    this.hourly = [];
    for(var i in json.hourly){
        var x = json.hourly[i];
        this.hourly.push(new WeatherData(x));
    }
    this.tracker = 0;
    this.forecast = getForecast(this);

    this.changeHour = function(i){
        this.tracker += i;
        if(this.mode = "hourly"){
            this.data = this.hourly[this.tracker];
        }
    }

    function getForecast(t){
        var ret = {
            "currently" : t.current.getData(),
            "hourly" : t.hourly
        }
        return JSON.stringify(ret);
    }
    function WeatherData(x){
        this.date = setTime(new Date(x.time * tAdj));
        this.temp = x.temp;
        this.cldCvr = x.cloud;
        this.ozone = x.ozone;

        function setTime(t){
            var hrs = t.getHours() + ":";
            var min = t.getMinutes() +":";
            var sec = t.getSeconds() + "";
            var day = t.toDateString();

            return {"day":day ,"time":(hrs + min + sec)};
        }

        this.getData = function(){
            return {"day":this.date.day, "time":this.date.time,
            "temp":this.temp, "cloud":this.cldCvr, "ozone":this.ozone};
        }
    }
}

module.exports = Forecast;