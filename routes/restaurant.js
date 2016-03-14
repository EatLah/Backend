var express = require('express');
var router = express.Router();

var restaurantController = require('../controllers/restaurantController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('restaurant');
});

router.get('/all_restaurants', restaurantController.getAllRestaurant);
router.get('/restaurant', restaurantController.getRestaurantByID);

module.exports = router;