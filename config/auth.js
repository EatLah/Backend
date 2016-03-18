var token = require('./token.js');

//db
var config = require('../config/config');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

exports.authenticate = function(req, res, next) {
  req.user = {};
  req.authentication = {
    isAuthenticated: false
  };
  if (!req.query) {
    req.authentication.message = 'no token provided';
    return next();
  }
  var eatlahToken = req.query.eatlah_token;
  if (eatlahToken) {
    var decoded = token.decryptToken(eatlahToken);
    if (decoded.expires > Date.now()) {
      var query = 'SELECT * FROM UserAccount WHERE userID=' + decoded.userID;
      db.all(query, function(err, rows) {
        if (rows) {
          req.authentication.isAuthenticated = true;
          req.user = user;
        } else {
          req.authentication.message = 'no user found';
        }
        return next();
      });

    } else {
      req.authentication.message = 'token expired';
      return next();
    }
  } else {
    req.authentication.message = 'no token provided';
    return next();
  }
};
