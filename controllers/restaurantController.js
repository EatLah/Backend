// db
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('schema/EatLah.db');

var getAllRestaurantQuery = 'SELECT * FROM RestaurantAccount';
exports.getAllRestaurant = function(req, res) {
	db.all(getAllRestaurantQuery, function (err, rows) {
      res.send(rows);
  });
};

exports.getRestaurantByID = function(req, res) {
	var restaurantID = req.query.restaurantID;
	db.each('SELECT * FROM RestaurantAccount WHERE ID=' + restaurantID, function(err, row) {
		res.send(row);
	});
};