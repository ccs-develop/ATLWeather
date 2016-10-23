var http = require('http'); 
var moment = require('moment');

var weatherService = function(){    
    var getCurrentWeather = function(cb){
      var options = {
          host: 'api.openweathermap.org',
          path: '/data/2.5/weather?'+
          'q=Atlanta,ga&'+
          'units=imperial&'+
          'appid=bd3c9d360da0e1d8f7839da34d8c6df9'
      };
      var callback = function(response){
         var str = '';
         
         response.on('data',function(chunk){
             str += chunk;

         });
         response.on('end',function(err, result){

                var weather = JSON.parse(str);
                var current = {
                        name: weather.name,
                        temp: weather.main.temp,    
                        main: weather.weather[0].main,
                        description: weather.weather[0].description,
                        icon: weather.weather[0].icon                          
                    };     
                cb(current);
             });        
              
         };
      

      http.request(options,callback).end();
    };

    var getFiveDayWeatherForecast = function(cb){
      var options = {
          host: 'api.openweathermap.org',
          path: '/data/2.5/forecast/daily?'+
          'q=Atlanta,ga&units=imperial&cnt=6&'+
          'appid=a6875a8a26238128066f12252df04095'
      };
      var callback = function(response){
         var str = '';
         
         response.on('data',function(chunk){
          
             str += chunk;
         });
         response.on('end',function(){
              var forecast = JSON.parse(str);                                 
                cb(forecast);
            
         });
      };

      http.request(options,callback).end();
    };

    var getDisplayData = function(cb, forecast){
        var icons = [];
        forecast.list.forEach(function(item){            
            var art='';
            switch(item.weather[0].icon){
                case '01d': art = 'art_clear.png'; break;
                case '02d': art = 'art_light_clouds.png'; break;
                case '03d': art = 'art_clouds.png'; break;
                case '04d': art = 'art_clouds.png'; break;
                case '09d': art = 'art_light_rain'; break;
                case '10d': art = 'art_rain.png'; break;
                case '11d': art = 'art_storm.png'; break;
                case '13d': art = 'art_snow.png'; break;
                case '50d': art = 'art_fog.png'; break;

                case '01n': art = 'art_clear.png'; break;
                case '02n': art = 'art_light_clouds.png'; break;
                case '03n': art = 'art_clouds.png'; break;
                case '04n': art = 'art_clouds.png'; break;
                case '09n': art = 'art_light_rain'; break;
                case '10n': art = 'art_rain.png'; break;
                case '11n': art = 'art_storm.png'; break;
                case '13n': art = 'art_snow.png'; break;
                case '50n': art = 'art_fog.png'; break;

                default: art = 'art_clear.png';
            }


            var greyart = '';
            switch(item.weather[0].icon){
                case '01d': greyart = 'ic_clear@2x.png'; break;
                case '02d': greyart = 'ic_light_clouds@2x.png'; break;
                case '03d': greyart = 'ic_cloudy@2x.png'; break;
                case '04d': greyart = 'ic_cloudy@2x.png'; break;
                case '09d': greyart = 'ic_light_rain@2x.png'; break;
                case '10d': greyart = 'ic_rain@2x.png'; break;
                case '11d': greyart = 'ic_storm@2x.png'; break;
                case '13d': greyart = 'ic_snow@2x.png'; break;
                case '50d': greyart = 'ic_fog@2x.png'; break;

                case '01n': greyart = 'ic_clear@2x.png'; break;
                case '02n': greyart = 'ic_light_clouds@2x.png'; break;
                case '03n': greyart = 'ic_cloudy@2x.png'; break;
                case '04n': greyart = 'ic_cloudy@2x.png'; break;
                case '09n': greyart = 'ic_light_rain@2x.png'; break;
                case '10n': greyart = 'ic_rain@2x.png'; break;
                case '11n': greyart = 'ic_storm@2x.png'; break;
                case '13n': greyart = 'ic_snow@2x.png'; break;
                case '50n': greyart = 'ic_fog@2x.png'; break;
                                                                
                default: greyart = 'art_clear@2x.png';
            }
           
            var d1 = new Date(item.dt*1000);
            var date = moment(d1).format('MMMM D');
                  
            var day = '';
            switch (d1.getDay()) {
                case 0:
                    day = 'Sunday';
                    break;
                case 1:
                    day = 'Monday';
                    break;
                case 2:
                    day = 'Tuesday';
                    break;
                case 3:
                    day = 'Wednesday';
                    break;
                case 4:
                    day = 'Thursday';
                    break;
                case 5:
                    day = 'Friday';
                    break;
                case 6:
                    day = 'Saturday';
            }

            var relDay = '';

            var direction = degToCompass(item.deg);           

            icons.push({date,day,art,greyart, direction});
        }); 

        cb(icons);     
    };

    var degToCompass = function(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    };

    var getWeather = function(cb){       
         getCurrentWeather(function(weather){
             getFiveDayWeatherForecast(function(forecast){
                 getDisplayData(function(icons){                     
                    cb(null, weather,forecast.list,icons);
                 },forecast);
                
             });
         });
    };

    return {
        getWeather: getWeather
    };
};

module.exports = weatherService;