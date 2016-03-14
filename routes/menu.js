var express = require('express');
var router = express.Router();

var menuController = require('../controllers/menuController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('menu');
});

router.get('/menuCategories', menuController.getMenuCategoriesByRestaurantID);

module.exports = router;