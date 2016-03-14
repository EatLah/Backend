// db
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('schema/EatLah.db');

exports.getItemsByRestaurantIDCategoryID = function(req, res) {
	var restaurantID = req.query.restaurantID;
	var categoryID = req.query.categoryID;

	var query = 'SELECT * FROM Menu WHERE restaurantAccID=' + restaurantID + ' AND categoryID=' + categoryID;
	db.all(query, function(err, rows) {
		res.send(rows);
	});
};