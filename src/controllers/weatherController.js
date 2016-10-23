var weatherController = function (weatherService) {
    var middleware = function (req, res, next) {
        //if (!req.user) {
        //res.redirect('/');
        //}
        next();
    };
    var getIndex = function (req, res) {
       weatherService.getWeather( function (err, weather, forecast, icons){           

             res.render('weatherView',{
                title: 'Weather',                
                weather: weather,
                forecast: forecast,
                iconList: icons
            });
        });
    };

    return {
        getIndex: getIndex,
        middleware: middleware
    };
};

module.exports = weatherController;