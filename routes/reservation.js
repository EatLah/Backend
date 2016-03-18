var express = require('express');
var router = express.Router();

var reservationController = require('../controllers/reservationController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('reservation');
});

router.post('/create', userController.requireAuthentication, reservationController.createReservation);

module.exports = router;