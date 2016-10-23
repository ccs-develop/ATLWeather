var express = require('express');
var weatherRouter = express.Router();

var router = function () {
    var weatherService = 
        require('../services/weatherService')();
    var weatherController = 
        require('../controllers/weatherController')(weatherService);

    weatherRouter.use(weatherController.middleware);
    weatherRouter.use(function (req, res, next) {        
        next();
    });
    weatherRouter.route('/')
        .get(weatherController.getIndex);

    return weatherRouter;
};
module.exports = router;
