var express = require('express');
var router = express.Router();

var customOrderController = require('../controllers/customOrderController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('customOrder');
});

module.exports = router;