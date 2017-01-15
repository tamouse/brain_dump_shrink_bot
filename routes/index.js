
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
            console.log("Data:", data);
            diaryEntries = data;
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
            res.render('show', {
                title: config.app_title,
                diaryEntry: data
            })
        })
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
    DiaryEntry.findById(req.params.id)
        .then(function (data) {
            data.title = req.body.title;
            data.body = req.body.body;
            // data.tags = req.body.tags;
            // data.categories = req.body.categories;
            data.save();

            res.redirect('/');
        })
});


module.exports = router;
