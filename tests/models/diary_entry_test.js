const mongoose = require('mongoose');
const expect = require('expect.js');
const config = require('./../../config/index');
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);
const DiaryEntry = require('./../../models/diary_entry');

describe('Diary Entry Model Text', function () {
    describe('save a new entry', function () {
        var diaryDoc = {body: 'lorem ipsum much?'};
        var diaryEntry = new DiaryEntry(diaryDoc);
        it('saved the diary entry', function () {
            diaryEntry.save(function (err) {
                expect(err).to.be.equal(null);
                expect(diaryEntry._id).to.be.ok();
            });
        });
    });
});
