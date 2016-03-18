var express = require('express');
var router = express.Router();

var orderItemController = require('../controllers/orderItemController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('orderItem');
});

module.exports = router;