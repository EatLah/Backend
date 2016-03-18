var jwt = require('jsonwebtoken');
var config = require('./config');

exports.generateToken = function(user) {
  var unencryptedToken = {
    userID: user.userID,
    userName: user.userName,
    userPassword: user.userPassword,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType,
    gender: user.gender,
    contactNumber: user.contactNumber,
    emailAddress: user.emailAddress,
    expires: Date.now() + 604800000
  };

  return jwt.sign(unencryptedToken, config.secret);
};

// decrypts the token provided with the key
exports.decryptToken = function(encryptedToken) {
  return jwt.verify(encryptedToken, config.secret);
};
