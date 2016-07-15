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

/*
 * Default task. Runs production environment task
 */
gulp.task('default', ['compile', 'copy']);

/*
 * Compile all HTML, CSS, and Javascript using useref
 */
gulp.task('compile', function () {
  return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', autoprefixer()))
    .pipe(gulpif('*.css', cleanCSS()))
    .pipe(changed('..'))
    .pipe(gulp.dest('..'));
});

/*
 * Move static files (images, audio...) to dist directory
 */
gulp.task('copy', function () {
  return gulp.src(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.mp3'])
    .pipe(changed('../assets'))
    .pipe(gulp.dest('../assets'));
});

/*
 * Watch for changes and execute specific tasks
 */
gulp.task('watch', ['watch:compile', 'watch:copy']);

gulp.task('watch:compile', function () {
  return gulp.watch(['**/*.html','assets/css/app.css', 'assets/js/*.*'], ['compile']);
});

gulp.task('watch:copy', function () {
  return gulp.watch(['assets/img/*.*', 'assets/music/*.mp3'], ['copy']);
});
