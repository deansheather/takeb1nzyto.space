/*
 * Initialize gulp
 *
 * Tasks in this file should be placed in ALPHABETICAL ORDER. Special tasks should
 * be placed at the top of the tasks list. All watch tasks should be placed after
 * the other tasks.
 */
var gulp = require('gulp');

/*
 * Initialize all required gulp plugins
 */
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var version = require('gulp-version-number');

/*
 * Default task. Runs production environment task
 */
gulp.task('default', ['compile:production', 'copy']);

/*
 * Development task. Runs development environment task
 */
gulp.task('dev', ['compile:dev', 'copy']);

/*
 * Compile all HTML, CSS, and Javascript using useref
 */
gulp.task('compile:dev', function () {
  return gulp.src('*.html')
    .pipe(useref())
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile:production', function () {
  gulp.src('*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', autoprefixer()))
    .pipe(gulpif('*.css', cleanCSS()))
    .pipe(gulp.dest('./dist'));

  return gulp.src('./dist/*.html')
    .pipe(version({
      append: {
        key: '_v',
        to: ['css', 'js']
      }
    }))
    .pipe(gulp.dest('./dist'));
});

/*
 * Move static files (images, audio...) to dist directory
 */
gulp.task('copy', function () {
  return gulp.src(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.mp3'])
    .pipe(changed('./dist/assets'))
    .pipe(gulp.dest('./dist/assets'));
});

/*
 * Watch for changes and execute specific tasks
 */
gulp.task('watch', ['watch:compile', 'watch:copy']);

gulp.task('watch:compile', function () {
  return gulp.watch(['**/*.html','assets/css/app.css', 'assets/js/*.*'], ['compile:dev']);
});

gulp.task('watch:copy', function () {
  return gulp.watch(['assets/img/*.*', 'assets/music/*.mp3'], ['copy']);
});
