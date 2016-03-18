// db
var config = require('config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);