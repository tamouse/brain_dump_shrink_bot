const expect = require('expect.js');

const config = require('./../../config');
const get_giphy = require('./../../services/get_giphy');

describe('get_giphy tests', function () {

    it('returns a json data block', function (done) {
        get_giphy.fetch_giphy(['funny', 'cat'], function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            expect(data).to.be.ok();
            done();
        });
    });
});
