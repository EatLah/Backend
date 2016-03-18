// db
var config = require('config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.getAllRestaurant = function(req, res) {
	var query = 'SELECT * FROM RestaurantAccount';
	db.all(query, function (err, rows) {
      res.send(rows);
  });
};

exports.getRestaurantByID = function(req, res) {
	var restaurantID = req.query.restaurantID;
	var query = 'SELECT * FROM RestaurantAccount WHERE ID=' + restaurantID;
	db.each(query, function(err, row) {
		res.send(row);
	});
};