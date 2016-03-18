// db
var config = require('../config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.createOrderItem = function(req, res) {
	var orderItem = req.body.orderItem;

	var query = 'INSERT INTO OrderItems VALUES(' + 'NULL' + ',\'' + 
													orderItem.orderNumber + '\',\'' +
													orderItem.restaurantID + '\',\'' +
													orderItem.reservationID + '\',\'' +
													orderItem.tableNumber + '\',\'' +
													orderItem.foodItemID + '\',\'' +
													orderItem.orderQty + '\',\'' +
													orderItem.subTotal + '\',\'' +
													orderItem.pax + '\',\'' +
													orderItem.request + '\',\'' +
													orderItem.prepStatus + '\')';

	db.run(query, function(err) {
		if (err) {
			console.log(err);
			return res.send({
				status: 'failed',
				message: 'Try again later.'
			});
		} else {
			orderItem.orderItemID = this.lastID;

			return res.status(200).send({
				status: 'success',
				message: 'Create orderItem successful.',
				// eatlah_token: eatlahToken,
				eatlah_orderItem: orderItem
			});
		}
	});
};