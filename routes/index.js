
var config = require('./../config');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
mongoose.Promise = global.Promise;

// Executing external python script
var virtualenv = require('virtualenv');
var path = require('path');
var packagePath = require.resolve('../package.json')
var env = virtualenv(packagePath);
var script = path.resolve('tag_extractor', 'braindump_process.py');

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

    var child = env.spawnPython([script]);

    child.stdout.on('data', function(data) {
        console.log(data.toString()); 
    });

    child.stderr.on('data', function(data) {
        console.log(data.toString()); 
    });

    child.on('exit', function() {
        res.redirect('/');
    });
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
            data.tags = req.body.tags.trim().split(/,[ \r\n\t]*/);
            // data.categories = req.body.categories;
            data.save();

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
