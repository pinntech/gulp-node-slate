/////////////////////
// gulp-node-slate //
/////////////////////

const fs =          require('fs-extra');
const through =     require('through2');
const exec =        require('child_process').execFileSync;
const PluginError = require('plugin-error');

const pluginName = 'gulp-node-slate';
module.exports = gulpNodeSlate;

function gulpNodeSlate(options) {
    const defaults = { source: 'source', build: 'build' };
    if (options !== undefined && typeof options !== 'object')
        throw new PluginError(pluginName, 'Options parameter must be an object');
    console.log('settings:', Object.assign(defaults, options));

    const folder = {
        nodeSlate:        'node_modules/node-slate',
        nodeSlateSrcOrig: 'node_modules/node-slate/source-original',
        nodeSlateSrc:     'node_modules/node-slate/source',
        nodeSlateBuild:   'node_modules/node-slate/build',
        source:           defaults.source,
        build:            defaults.build
        };

    function logExec(cmd, folder) {
        const args = cmd.split(' ').splice(1, cmd.length - 1);
        const options = { stdio: 'inherit' };
        if (folder)
            options.cwd = folder;
        console.log(cmd + (folder ? ' ./' + folder : ''));
        exec(cmd.split(' ')[0], args, options);
        }

    function setupNodeSlate() {
        console.log(fs.existsSync(folder.nodeSlate + '/node_modules') ? 'node-slate installed' : 'downloading...');
        logExec('npm install', folder.nodeSlate);
        if (!fs.existsSync(folder.nodeSlateSrcOrig))
            fs.copySync(folder.nodeSlateSrc, folder.nodeSlateSrcOrig);
        }

    function setupCustomFolder() {
        fs.copySync(folder.nodeSlateSrcOrig + '/index.yml', folder.source + '/index.yml', { overwrite: false });
        fs.copySync(folder.nodeSlateSrcOrig + '/images/logo.png', folder.source + '/images/logo.png', { overwrite: false });
        if (!fs.existsSync(folder.source + '/includes'))
            fs.copySync(folder.nodeSlateSrcOrig + '/includes', folder.source + '/includes');
        fs.ensureFileSync(folder.source + '/custom.scss');
        }

    function rebuildNodeSlateSourceFolder() {
        fs.removeSync(folder.nodeSlateSrc);
        fs.copySync(folder.nodeSlateSrcOrig, folder.nodeSlateSrc);
        fs.removeSync(folder.nodeSlateSrc + '/includes');
        fs.copySync(folder.source, folder.nodeSlateSrc);
        fs.moveSync(folder.nodeSlateSrc + '/custom.scss', folder.nodeSlateSrc + '/stylesheets/_custom.scss');
        fs.appendFileSync(folder.nodeSlateSrc + '/stylesheets/screen.css.scss', '\n@import "custom";');
        fs.appendFileSync(folder.nodeSlateSrc + '/stylesheets/print.css.scss', '\n@import "custom";');
        }

    function generateApiDocs() {
        fs.removeSync(folder.nodeSlateBuild);
        logExec('npm run build', folder.nodeSlate);
        fs.removeSync(folder.build);
        fs.copySync(folder.nodeSlateBuild, folder.build);
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
