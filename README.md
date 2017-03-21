<p align=center>
    <img src=https://raw.githubusercontent.com/lord/img/master/logo-slate.png alt=logo>
    <br>
    Slate helps you create beautiful, intelligent, responsive API documentation.
</p>

# gulp-node-slate
*[node-slate](https://github.com/sdelements/node-slate) as a gulp task*

## A) Lightning quick demo

Don't have an existing gulp project?  Just want to experiment with no commitment?

#### Blindly enter these commands:
```
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
```
$ npm install gulp-node-slate --save-dev
```

#### 2. Add a task to your **gulpfile.js**:
```javascript
var slate = require('gulp-node-slate');
function generateApiDocs() { return gulp.src([]).pipe(slate()); }
gulp.task('slate', generateApiDocs);
```

#### 3. Build and view the API documentation:
```
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
    custom.scss
    index.yml
```

#### 4. Get to work
Customize the files in the `source` folder to create your API documentation
and then rerun `gulp slate`.

## C) Note
This project is very new.  If you have a question or suggestion, feel free to open an
[issue](https://github.com/pinntech/gulp-node-slate/issues).

---
[MIT License](LICENSE.txt)
