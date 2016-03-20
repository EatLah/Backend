// db
var config = require('../config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.createCreditCard = function(req, res) {
	var card = req.body.card;

	var query = 'INSERT INTO CreditCard VALUES(' + 'NULL' + ',\'' + 
													card.customerID + '\',\'' +
													card.nameOnCard + '\',\'' +
													card.cardNumber + '\',\'' +
													card.cardType + '\',\'' +
													card.cardExpiry + '\',\'' +
													card.verificationCode + '\')';

	db.run(query, function(err) {
		if (err) {
			console.log(err);
			return res.send({
				status: 'failed',
				message: 'Try again later.'
			});
		} else {
			card.cardID = this.lastID;

			return res.status(200).send({
				status: 'success',
				message: 'Create credit card successful.',
				// eatlah_token: eatlahToken,
				eatlah_card: card
			});
		}
	});
};

exports.getCreditCard = function(req, res) {
	var customerID = req.query.customerID;
	var query = 'SELECT * FROM CreditCard WHERE customerID=' + customerID;
	db.all(query, function(err, rows) {
		res.send(rows[0]);
	});
};