var express = require('express');
var router = express.Router();

var orderItemController = require('../controllers/orderItemController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('orderItem');
});

router.post('/create', orderItemController.createOrderItem);

module.exports = router;