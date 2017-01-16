const config = require('../config');
const mongoose = require('mongoose');
const sanitize = require('sanitize-html');
const timestamps = require('mongoose-times');

var Schema = mongoose.Schema;

var DiaryEntry = new Schema({
  title: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  tags: [String],
  categories: [String],

});

DiaryEntry.plugin(timestamps);
DiaryEntry.pre('save', function (next) {
  this.title = sanitize(this.title, {
    allowedTags: [],
    allowedAttributes: []
  });
  this.body = sanitize(this.body, {
    allowedTags: [],
    allowedAttributes: []
  });
  next();
});
module.exports = mongoose.model('diaryEntry', DiaryEntry);
