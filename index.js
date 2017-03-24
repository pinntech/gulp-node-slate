/////////////////////
// gulp-node-slate //
/////////////////////

'use strict';

var fs =      require('fs-extra');
var gutil =   require('gulp-util');
var through = require('through2');
var exec =    require('child_process').execFileSync;

var pluginName = 'gulp-node-slate';
module.exports = gulpNodeSlate;

function gulpNodeSlate(options) {
    options = options || {};
    if (typeof options !== 'object')
        throw new gutil.PluginError(pluginName, 'Options must be an object');

    var folder = {
        nodeSlate:        'node_modules/node-slate',
        nodeSlateSrcOrig: 'node_modules/node-slate/source-original',
        nodeSlateSrc:     'node_modules/node-slate/source',
        nodeSlateBuild:   'node_modules/node-slate/build'
        };

    function logExec(cmd, folder) {
        var args = cmd.split(' ').splice(1, cmd.length - 1);
        var options = folder ? { cwd: folder } : {};
        console.log(cmd + (folder ? ' ./' + folder : ''));
        console.log(exec(cmd.split(' ')[0], args, options).toString() || 'done');
        }

    function setupNodeSlate() {
        console.log(fs.existsSync(folder.nodeSlate + '/node_modules') ? 'node-slate installed' : 'downloading...');
        logExec('npm install', folder.nodeSlate);
        if (!fs.existsSync(folder.nodeSlateSrcOrig))
            fs.copySync(folder.nodeSlateSrc, folder.nodeSlateSrcOrig);
        }

    function setupCustomFolder() {
        fs.copySync(folder.nodeSlateSrcOrig + '/index.yml', 'source/index.yml', { overwrite: false });
        fs.copySync(folder.nodeSlateSrcOrig + '/images/logo.png', 'source/images/logo.png', { overwrite: false });
        if (!fs.existsSync('source/includes'))
            fs.copySync(folder.nodeSlateSrcOrig + '/includes', 'source/includes');
        logExec('touch source/custom.scss');
        }

    function rebuildNodeSlateSourceFolder() {
        fs.removeSync(folder.nodeSlateSrc);
        fs.copySync(folder.nodeSlateSrcOrig, folder.nodeSlateSrc);
        fs.removeSync(folder.nodeSlateSrc + '/includes');
        fs.copySync('source', folder.nodeSlateSrc);
        fs.moveSync(folder.nodeSlateSrc + '/custom.scss', folder.nodeSlateSrc + '/stylesheets/_custom.scss');
        fs.appendFileSync(folder.nodeSlateSrc + '/stylesheets/screen.css.scss', '\n@import "custom";');
        fs.appendFileSync(folder.nodeSlateSrc + '/stylesheets/print.css.scss', '\n@import "custom";');
        }

    function generateApiDocs() {
        fs.removeSync(folder.nodeSlateBuild);
        logExec('npm run build', folder.nodeSlate);
        fs.removeSync('build');
        fs.copySync(folder.nodeSlateBuild, 'build');
        }

    function transform(file, encoding, done) {
        done(null, file);
        }

    function completion(done) {
        setupNodeSlate();
        setupCustomFolder();
        rebuildNodeSlateSourceFolder();
        generateApiDocs();
        done();
        }

    return through.obj(transform, completion);  //return stream
    }
