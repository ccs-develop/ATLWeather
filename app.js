var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 5000;

var weatherRouter = require('./src/routes/weatherRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/', weatherRouter);

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});