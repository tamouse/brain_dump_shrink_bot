
var config = require('./../config');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var DiaryEntry = require('./../models/diary_entry');

/* GET home page. */
router.get('/', function (req, res, next) {
    var diaryEntries = [];
    DiaryEntry.find()
        .then(function (data) {
            diaryEntries = data;
        });
    res.render('index',
        {
            title: config.app_title,
            diaryEntries: diaryEntries
        }
    )
});

router.post('/', function (req, res, next) {
    var entryDoc = { body: req.body };
    var newEntry = new DiaryEntry(entryDoc);
    newEntry.save();

    res.redirect('/');
});

router.get('/new', function (req, res, next) {
    res.render('new', { title: config.app_title })
});

module.exports = router;
