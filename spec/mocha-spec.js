var assert =        require('assert');
var gulpNodeSlate = require('../index.js');

describe('gulp-node-slate plugin', () => {
    it('is exported as function', () => {
        var actual =   typeof gulpNodeSlate;
        var expected = 'function';
        assert.equal(actual, expected);
        })
    });
