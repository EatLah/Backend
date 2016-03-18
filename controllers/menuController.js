// db
var config = require('config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.getMenuCategoriesByRestaurantID = function(req, res) {
	var restaurantID = req.query.restaurantID;

	var query = 'SELECT * FROM MenuCategory WHERE restaurantID=' + restaurantID;
	db.all(query, function(err, rows) {
		res.send(rows);
	});
};