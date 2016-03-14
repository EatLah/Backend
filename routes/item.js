var express = require('express');
var router = express.Router();

var itemController = require('../controllers/itemController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('item');
});

router.get('/items', itemController.getItemsByRestaurantIDCategoryID);

module.exports = router;