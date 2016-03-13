var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');

// app
var app = express();

// db
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('schema/EatLah.db');

// require route
var index = require('./routes/index');
var order = require('./routes/order');
var user = require('./routes/user');
var restaurant = require('./routes/restaurant');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./config/cors').allowCrossDomain);
app.use(require('./config/caching').removeNotModified);

// route
app.use('/', index);
// app.use(require('./config/tokenauth').authenticate);
app.use('/order', order);
app.use('/user', user);
app.use('/restaurant', restaurant);
app.use(require('./routes/error').errorHandler); // error handler
