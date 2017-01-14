const config = require('../config');
const mongoose = require('mongoose');
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
module.exports = mongoose.model('diaryEntry', DiaryEntry);
