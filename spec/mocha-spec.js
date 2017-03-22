/////////////////////
// gulp-node-slate //
/////////////////////

// Run:
//  $ cd gulp-node-slate
//  $ npm update
//  $ npm run mocha

var assert =        require('assert');
var gulpNodeSlate = require('../index.js');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('gulp-node-slate plugin', () => {
    it('is exported as a function', () => {
        var actual =   typeof gulpNodeSlate;
        var expected = 'function';
        assert.equal(actual, expected);
        });
    });
