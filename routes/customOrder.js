var express = require('express');
var router = express.Router();

var customOrderController = require('../controllers/customOrderController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('customOrder');
});

router.post('/create', customOrderController.createCustomOrder);

module.exports = router;