
var config = require('./../config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: config.app_title })
});

router.get('/new', function (req, res, next) {
    res.render('new', { title: config.app_title })
});

module.exports = router;
