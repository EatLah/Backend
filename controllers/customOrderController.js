// db
var config = require('../config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.createCustomOrder = function(req, res) {
	var customOrder = req.body.customOrder;

	var query = 'INSERT INTO CustomerOrder VALUES(' + 'NULL' + ',\'' + 
													customOrder.restaurantID + '\',\'' +
													customOrder.reservationID + '\',\'' +
													customOrder.tableNumber + '\',\'' +
													customOrder.staffID + '\',\'' +
													customOrder.orderTimestamp + '\',\'' +
													customOrder.totalBill + '\',\'' +
													customOrder.orderStatus + '\',\'' +
													customOrder.orderType + '\')';

	db.run(query, function(err) {
		if (err) {
			console.log(err);
			return res.send({
				status: 'failed',
				message: 'Try again later.'
			});
		} else {
			customOrder.orderID = this.lastID;

			return res.status(200).send({
				status: 'success',
				message: 'Create customOrder successful.',
				// eatlah_token: eatlahToken,
				eatlah_customOrder: customOrder
			});
		}
	});
};