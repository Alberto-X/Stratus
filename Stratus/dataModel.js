function Forecast(f){
    var json = JSON.parse(f);
    var c = json.currently;
    this.current = new WeatherData(c.time, c.temp, c.cloud, c.ozone);
    this.hourly = [];
    for(var x in json.hourly){
        y = json.hourly[x];
        this.hourly.push(new WeatherData(y.time, y.temp, y.cloud, y.ozone));
    }
    this.tracker = 0;
    this.mode = "current";
    this.data = this.current;

    //console.log(this.hourly);
    this.forcast = getForecast(this);

    this.changeMode = function(){
        if(this.mode == "current"){
            this.mode = "hourly";
            this.data = this.hourly[this.tracker];
        } else {
            this.mode = "current";
            this.data = this.current;
        }
    }

    this.changeHour = function(inc){
        this.tracker += inc;
        if(this.mode = "hourly"){
            this.data = this.hourly[this.tracker];
        }
    }

    function getForecast(t){
        var ret = new Object();

        ret.currently = t.current.getData();
        ret.hourly = []; 

        for(var x in t.hourly){
            y = t.hourly[x];
            ret.hourly.push(y.getData());
        }

        return JSON.stringify(ret);
    }
}

function WeatherData(time, temp, cld, ozn){
    this.date = setTime(new Date(time * 1000));
    this.temp = temp;
    this.cldCvr = cld;
    this.ozone = ozn;
    

    function setTime(x){
        var hrs = x.getHours() + ":";
        var min = x.getMinutes() +":";
        var sec = x.getSeconds() + "";
        var day = x.toDateString();

        return {"day":day ,"time":(hrs + min + sec)};
    }

    this.getData = function(){
        return {"day":this.date.day, "time":this.date.time,
         "temp":this.temp, "cloud":this.cldCvr, "ozone":this.ozone};
    }
}

module.exports = Forecast;