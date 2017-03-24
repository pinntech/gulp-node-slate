/////////////////////
// gulp-node-slate //
/////////////////////

// Run:
//  $ cd gulp-node-slate
//  $ npm update
//  $ npm run mocha

var assert =        require('assert');
var es =            require('event-stream');
var fs =            require('fs');
var File =          require('vinyl');
var gulpNodeSlate = require('../index.js');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The gulp-node-slate plugin', () => {

    it('is exported as a function', () => {
        var actual =   typeof gulpNodeSlate;
        var expected = 'function';
        assert.equal(actual, expected);
        });

    });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Running the gulp-node-slate plugin', () => {

    it('passes through a file in the stream', (done) => {
        var mockFile = new File({ contents: es.readArray(['[A]', '[B]', '[C]']) });
        function handleFileFromStream(file) {
            assert(file.isStream());
            function handleDataFromFile(err, data) {
                assert.equal(data, '[A][B][C]');
                done();
                }
            file.contents.pipe(es.wait(handleDataFromFile));
            }
        var pluginStream = gulpNodeSlate();
        pluginStream.on('data', handleFileFromStream);
        pluginStream.write(mockFile);
        pluginStream.end();
        }).timeout(60000);  //in case node-slate needs to be downloaded

    it('creates the API documentation web page', () => {
        var webPage = 'build/index.html';
        assert(fs.existsSync(webPage));
        });

    });
