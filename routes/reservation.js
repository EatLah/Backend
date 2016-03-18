var express = require('express');
var router = express.Router();

var reservationController = require('../controllers/reservationController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('reservation');
});

module.exports = router;