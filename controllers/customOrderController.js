// db
var config = require('../config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.createCustomeOrder = function(req, res) {
	var customeOrder = req.body.customeOrder;

	var query = 'INSERT INTO CustomOrder VALUES(' + 'NULL' + ',\'' + 
													user.userName + '\',\'' +
													user.userPassword + '\',\'' +
													user.firstName + '\',\'' +
													user.lastName + '\',\'' +
													user.userType + '\',\'' +
													user.gender + '\',\'' +
													user.contactNumber + '\',\'' +
													user.emailAddress + '\')';
};