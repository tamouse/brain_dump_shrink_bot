
var config = require('./../config');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
mongoose.Promise = global.Promise;
var DiaryEntry = require('./../models/diary_entry');

function getDate(data) {
  return moment(data);
};

/* GET home page. */
router.get('/', function (req, res, next) {
    var diaryEntries = [];
    DiaryEntry.find()
        .sort({created: -1})
        .then(function (data) {
            console.log("Data:", data);
            diaryEntries = data;
            diaryEntries.getDate = getDate;
            res.render('index',
                {
                    title: config.app_title,
                    diaryEntries: diaryEntries
                });
        });
});

router.post('/', function (req, res, next) {
    var entryDoc = { body: req.body.body };
    console.log("entryDoc:", entryDoc);
    var newEntry = new DiaryEntry(entryDoc);
    newEntry.save();
    console.log("newEntry:", newEntry);

    res.redirect('/');
});

router.get('/new', function (req, res, next) {
    res.render('new', { title: config.app_title })
});

router.get('/:id', function (req, res, next) {
    DiaryEntry.findById(req.params.id)
        .then(function (data) {
          var diaryEntry;
          diaryEntry = data;
          diaryEntry.getDate = getDate;
            res.render('show', {
                title: config.app_title,
                diaryEntry: data
            })
        })
        // diaryEntry.getDate = getDate;
});

router.get('/:id/edit', function (req, res, next) {
    DiaryEntry.findById(req.params.id)
        .then(function (data) {
            res.render('edit', {
                title: config.app_title,
                diaryEntry: data
            })
        })
});

router.post('/:id', function (req, res, next) {
    console.log("Update requrest: " + req.params.id);
    DiaryEntry.findById(req.params.id)
        .then(function (data) {
            console.log("Found item: " + data._id);
            data.title = req.body.title;
            data.body = req.body.body;
            data.tags = req.body.tags.trim().split(/,[ \r\n\t]*/);
            // data.categories = req.body.categories;
            data.save();
            console.log("Data:" + JSON.stringify(data, null, 2));
            res.redirect('/');
        })
});

router.post('/:id/delete', function (req, res, next) {
    console.log(req.params.id);
    DiaryEntry.findByIdAndRemove(req.params.id)
        .then(function (data) {
            res.redirect('/');
        })
});

module.exports = router;
