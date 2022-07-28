var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors')
const mongoose=require('mongoose');
const dotenv=require('dotenv')

dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter=require('./routes/admin')

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    next();
});
mongoose.connect('mongodb://localhost:27017/FullstackStudy').then(()=>{
    console.log('mongo db connected');
}).catch(()=>{
    console.log('mongo db connection error')
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);

module.exports = app;
