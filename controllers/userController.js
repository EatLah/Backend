// db
var config = require('../config/config');
var token = require('../config/token');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

var crypto = require('crypto');

exports.requireAuthentication = function(req, res, next) {
  if (req.authentication.isAuthenticated) {
    return next();
  } else {
    return res.status(403).send({
      error: req.authentication.message
    });
  }
};

exports.registerUser = function(req, res) {
	var user = req.body.user;
	console.log(user);
	user.userPassword = crypto.createHash('sha1').update(user.userPassword).digest('hex');
	// Check if this user already exists
	db.all('SELECT * FROM UserAccount WHERE contactNumber=' + user.contactNumber, function(err, rows) {
		if (err) {
			return res.send({
				status: 'error',
				message: 'Error occurs.'
			});
		} else if (rows.length > 0) {
			return res.send({
				status: 'failed',
				message: 'User already exists.'
			});
		} else {
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
					return res.send({
						status: 'failed',
						message: 'Try again later.'
					});
				} else {
					user.userID = this.lastID;
					var eatlahToken = token.generateToken(user);

					return res.status(200).send({
						status: 'success',
						message: 'Register successful.',
						eatlah_token: eatlahToken,
						eatlah_user: user
					});
				}
			});
		}
	});
};

exports.loginUser = function(req, res) {
	var contactNumber = req.body.contactNumber;
	var userPassword = crypto.createHash('sha1').update(req.body.userPassword).digest('hex');

	var query = 'SELECT * FROM UserAccount WHERE contactNumber=' + contactNumber + ' AND userPassword=\'' + userPassword + '\'';
	db.all(query, function(err, rows) {
		if (err) {
			return res.send({
				status: 'error',
				message: 'Error occurs.'
			});
		} else if (rows.length == 0) {
			return res.send({
				status: 'failed',
				message: 'Wrong mobile number or password.'
			});
		} else if (rows.length > 0) {
			var user = rows[0];
			var eatlahToken = token.generateToken(user);

			return res.status(200).send({
        		status: 'success',
        		message: 'Login successful.',
        		eatlah_token: eatlahToken,
        		eatlah_user: user
        	});
		}
	});
};

exports.findUser = function(req, res) {
	var contactNumber = req.query.contactNumber;

	var query = 'SELECT * FROM UserAccount WHERE contactNumber=' + contactNumber;
	db.all(query, function(err, rows) {
		res.send(rows);
	});
};