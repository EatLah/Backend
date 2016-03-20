var express = require('express');
var router = express.Router();

var creditController = require('../controllers/creditController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('credit');
});

router.post('/credit', creditController.createCreditCard);
router.get('/credit', creditController.getCreditCard);

module.exports = router;