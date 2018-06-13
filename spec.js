/////////////////////
// gulp-node-slate //
/////////////////////

// Run:
//  $ cd gulp-node-slate
//  $ npm test

const assert =         require('assert');
const es =             require('event-stream');
const fs =             require('fs');
const ReadableStream = require('stream').Readable;
const Vinyl =          require('vinyl');
const gulpNodeSlate =  require('./index.js');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The gulp-node-slate plugin', () => {

    it('is exported as a function', () => {
        const actual =   typeof gulpNodeSlate;
        const expected = 'function';
        assert.equal(actual, expected);
        });

    it('throws an error when given a bogus configuration', () => {
        function callPluginWithBogusConfig() { gulpNodeSlate('bogus!'); }
        assert.throws(callPluginWithBogusConfig, /Options parameter must be an object/);
        });

    });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Running the gulp-node-slate plugin', () => {
    const options = { source: 'api-docs/input', build: 'api-docs/output' };
    const oneMinute = 60 * 1000;

    it('passes through a file in the stream', (done) => {
        const mockFile = new Vinyl({ contents: new ReadableStream() });
        mockFile.contents.push('node-slate as a gulp task!');
        mockFile.contents.push(null);  //EOF
        function handleFileFromStream(file) {
            assert(file.isStream());
            function handleDataFromFile(err, data) {
                assert.equal(data.toString(), 'node-slate as a gulp task!');
                done();
                }
            file.contents.pipe(es.wait(handleDataFromFile));
            }
        const pluginStream = gulpNodeSlate(options);
        pluginStream.on('data', handleFileFromStream);
        pluginStream.write(mockFile);
        pluginStream.end();
        }).timeout(oneMinute);  //in case node-slate needs to be downloaded

    it('creates the API documentation web page', () => {
        const webPage = options.build + '/index.html';
        assert(fs.existsSync(webPage));
        });

    });
