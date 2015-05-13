/**
 * Created by roberto on 5/12/15.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var inject = require('gulp-inject');
var angularTemplates = require('gulp-angular-templates');
var angularSort = require('gulp-angular-filesort');
var del = require('del');
var wiredep = require('wiredep');
var replace = require('gulp-replace');

/**
 * The default task is to compile the final
 * distribution.
 */
gulp.task('default', ['dist'], function() {

});


/**
 * Building the final distribution involves
 * creating files optimized for public consumption. The end result
 * is placed in the "public" directory because we will push
 * the code to parse using the `parse` CLI utility, and that utility
 * needs the code be located in "public/".
 *
 * - minifying the app JS
 * - concatenating the app JS into a single file
 * - concatenating the app templates into a single file
 * - naming the files according to their content, so that
 *   the browser can cache them indefinitely
 * - copying the bower dependecy JS into public/
 * - altering the public/index.html to load the javascript
 *   from public/ since that is the optimzed code that
 *   will be pushed to parse.
 */
gulp.task('dist', ['alter-index'], function() {

});

gulp.task('minify-code', function() {
    return gulp
        .src(['./app/app.js', './app/**/*.js', '!./app/**/*-test.js'])
        .pipe(angularSort())
        .pipe(uglify())
        .pipe(concat('./app-all.js'))
        .pipe(rev())
        .pipe(gulp.dest('./public'));
});

gulp.task('clean', function(cb) {
    del(['public'], cb);
});

/**
 * gets all angular templates, reads them
 * and puts them in a single JS file.
 */
gulp.task('minify-templates', function() {
    return gulp
        .src(['./app/**/*.html'])
        .pipe(angularTemplates({ module: 'parseAngular' }))
        .pipe(concat('./app-all-templates.js'))
        .pipe(rev())
        .pipe(gulp.dest('./public'));
});

/**
 * copies dependencies (angular, parse) and puts them
 * in the public/ directory.  The directory structure
 * is kept.
 *
 * TODO: ideally these should be versioned also, so
 * that when we update the dependencies clients get
 * the new version.
 */
gulp.task('cp-deps', function() {
    var deps = wiredep({});

    // setting base so that the directory structure
    // is replicated, and the altering of the
    // index.html becomes easier.
    return gulp.src(deps.js, { base: '.'})
        .pipe(gulp.dest('./public'));
});

/**
 * ideally gulp-inject would do this for us, but I
 * can't seem to get it to replace the bower
 * dependencies.
 */
gulp.task('alter-index', ['inject-prod'], function() {
    gulp.src('./public/index.html')
        .pipe(replace(/\.\.\/bower_components/g, 'bower_components'))
        .pipe(replace(/\/public\//g, ''))
        .pipe(gulp.dest('./public'));
});

gulp.task('inject-prod', ['cp-deps', 'minify-code', 'minify-templates'], function() {
    var target = gulp.src('./app/index.html');
    var sources = gulp
        .src(['./public/*.js']);
    return target
        .pipe(inject(sources))
        .pipe(gulp.dest('./public'))
});