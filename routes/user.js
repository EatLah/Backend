var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('user');
});

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

router.get('/user', userController.findUser);

module.exports = router;