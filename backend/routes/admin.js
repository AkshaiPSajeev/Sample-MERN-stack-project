var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const User=require('../models/userModel');
const userHelpers=require('../helpers/user-helpers');
const adminHelpers=require('../helpers/admin-helpers');
const VerifyAdmin=require('../middlewares/Authenticate')
mongoose.connect('mongodb://localhost:27017/FullstackStudy');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
router.post('/login',adminHelpers.authenticateAdmin);
router.get('/getUsers',VerifyAdmin.VerifyAdmin,userHelpers.getAllUsers);
router.patch('/blockUser',VerifyAdmin.VerifyAdmin,userHelpers.blockUser);
router.patch('/unblockUser',VerifyAdmin.VerifyAdmin,userHelpers.unblockUser);
router.get('/getUser',VerifyAdmin.VerifyAdmin,userHelpers.getUser)
module.exports = router;