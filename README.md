<p align=center>
    <img src=https://raw.githubusercontent.com/lord/img/master/logo-slate.png width=200 alt=logo><br>
    Slate helps you create beautiful, intelligent, responsive API documentation.<br>
    <img src=https://raw.githubusercontent.com/lord/img/master/screenshot-slate.png width=700 alt=screenshot>
</p>

# gulp-node-slate
*[node-slate](https://github.com/sdelements/node-slate) as a gulp task*

[![npm](https://img.shields.io/npm/v/gulp-node-slate.svg)](https://github.com/pinntech/gulp-node-slate)
&nbsp;
[![dependencies Status](https://david-dm.org/pinntech/gulp-node-slate/status.svg)](https://david-dm.org/pinntech/gulp-node-slate)
&nbsp;
[![Build Status](https://travis-ci.org/pinntech/gulp-node-slate.svg)](https://travis-ci.org/pinntech/gulp-node-slate)

## A) Lightning quick demo

Don't have an existing gulp project?  Just want to experiment with no commitment?

#### Blindly enter these commands:
```shell
$ mkdir my-api-docs
$ cd my-api-docs
$ npm init --yes
$ npm install gulp --save-dev
$ npm install gulp-node-slate --save-dev
$ cat > gulpfile.js << EOF
var gulp =  require('gulp');
var slate = require('gulp-node-slate');
gulp.task('default', function() { return gulp.src([]).pipe(slate()); });
EOF
$ gulp
$ open build/index.html
```

Otherwise, follow the steps below.

## B) Instructions

#### 1. Install into your project:
```shell
$ npm install gulp-node-slate --save-dev
```
Alternatively, you can manually insert `"gulp-node-slate": "~0.0",` into the `devDependencies` of
your **package.json** and then run `npm install`.

#### 2. Add a task to your **gulpfile.js**:
```javascript
var slate = require('gulp-node-slate');
function generateApiDocs() { return gulp.src([]).pipe(slate()); }
gulp.task('slate', generateApiDocs);
```

#### 3. Build and view the API documentation:
```shell
$ gulp slate
$ ls source
$ open build/index.html
```

The structure of the generated `source` folder is:
```
source/
    images/
        logo.png
    includes/
        *.md
    custom.scss
    index.yml
```

#### 4. Get to work
Customize the files in the `source` folder to create your API documentation
and then rerun `gulp slate`.

## C) Configuration
Example of passing in options:
```javascript
.pipe(slate({ source: 'api-docs/input', build: 'api-docs/output' }))
```
**Options:**
* `source` &ndash; Relative path to the Slate API documentation input folder (default: `'source'`).
* `build` &ndash; Relative path to the Slate API documentation output folder (default: `'build'`).

## E) Notes
1. If you want to contribute to the project, fork it and then run the `spec/spec-runner.sh.command`
script and examine the contents of the `api-docs` folder.  Pull requests are welcome.
1. This project is very new.  If you have a question or suggestion, feel free to open an
[issue](https://github.com/pinntech/gulp-node-slate/issues).

---
[MIT License](LICENSE.txt)
