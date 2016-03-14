// db
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('schema/EatLah.db');

exports.getMenuCategoriesByRestaurantID = function(req, res) {
	var restaurantID = req.query.restaurantID;
	db.all('SELECT * FROM MenuCategory WHERE restaurantID=' + restaurantID, function(err, rows) {
		res.send(rows);
	});
};