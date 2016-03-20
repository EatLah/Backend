// db
var config = require('../config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.createReservation = function(req, res) {
	var reservation = req.body.reservation;

	var query = 'INSERT INTO Reservation VALUES(' + 'NULL' + ',\'' + 
													reservation.restaurantID + '\',\'' +
													reservation.customerID + '\',\'' +
													reservation.numberOfPax + '\',\'' +
													reservation.reservationStatus + '\',\'' +
													reservation.bookedTimeslot + '\',\'' +
													reservation.orderNumber + '\',\'' +
													reservation.review + '\')';

	db.run(query, function(err) {
		if (err) {
			console.log(err);
			return res.send({
				status: 'failed',
				message: 'Try again later.'
			});
		} else {
			reservation.reservationID = this.lastID;

			return res.status(200).send({
				status: 'success',
				message: 'Create reservation successful.',
				// eatlah_token: eatlahToken,
				eatlah_reservation: reservation
			});
		}
	});
};

exports.getReservations = function(req, res) {
	var customerID = req.query.customerID;

	var query = 'SELECT * FROM Reservation WHERE customerID=' + customerID;
	db.all(query, function(err, rows) {
		res.send(rows);
	});
};