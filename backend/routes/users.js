var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const User=require('../models/userModel');
const userHelpers=require('../helpers/user-helpers')

mongoose.connect('mongodb://localhost:27017/FullstackStudy');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',userHelpers.doLogin)
router.post('/register',userHelpers.registerUser)

module.exports = router;
