// db
var config = require('../config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.createCustomeOrder = function(req, res) {
	var customeOrder = req.body.customeOrder;

	var query = 'INSERT INTO CustomOrder VALUES(' + 'NULL' + ',\'' + 
													customeOrder.restaurantID + '\',\'' +
													customeOrder.reservationID + '\',\'' +
													customeOrder.tableNumber + '\',\'' +
													customeOrder.staffID + '\',\'' +
													customeOrder.orderTimestamp + '\',\'' +
													customeOrder.totalBill + '\',\'' +
													customeOrder.orderStatus + '\',\'' +
													customeOrder.orderType + '\')';

	db.run(query, function(err) {
		if (err) {
			return res.send({
				status: 'failed',
				message: 'Try again later.'
			});
		} else {
			customeOrder.orderID = this.lastID;

			return res.status(200).send({
				status: 'success',
				message: 'Create customeOrder successful.',
				eatlah_token: eatlahToken,
				eatlah_customeOrder: customeOrder
			});
		}
	});
};