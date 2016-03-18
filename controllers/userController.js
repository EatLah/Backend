// db
var config = require('../config/config');
var token = require('../config/token');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

var crypto = require('crypto');

exports.registerUser = function(req, res) {
	var user = req.body.user;
	user.userPassword = crypto.createHash('sha1').update(user.userPassword).digest('hex');

	// Check if this user already exists

	var query = 'INSERT INTO UserAccount VALUES(' + 'NULL' + ',\'' + 
													user.userName + '\',\'' +
													user.userPassword + '\',\'' +
													user.firstName + '\',\'' +
													user.lastName + '\',\'' +
													user.userType + '\',\'' +
													user.gender + '\',\'' +
													user.contactNumber + '\',\'' +
													user.emailAddress + '\')';
	db.run(query, function(err) {
		if (err) {
			res.send(err);
		} else {
			user.userID = this.lastID;
			var eatlahToken = token.generateToken(user);

			res.status(200).send({
				status: 'success',
				eatlah_token: eatlahToken,
				user: user
			});
		}
	});
};

exports.loginUser = function(req, res) {
	
};

exports.findUser = function(req, res) {
	var contactNumber = req.query.contactNumber;

	var query = 'SELECT * FROM UserAccount WHERE contactNumber=' + contactNumber;
	db.all(query, function(err, rows) {
		res.send(rows);
	});
};