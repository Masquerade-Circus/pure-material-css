// Include gulp
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var stylus = require('gulp-stylus');
var jade = require('jade');
var gulpJade = require('gulp-jade');

gulp.task('connect', function () {
    browserSync.init({
        server: {
            baseDir: './',
          },
        open: false,
        port: 8080,
        injectChanges: true,
        codeSync: true,
      });
  });

gulp.task('stylus', function () {
    return gulp.src('./styl/pure-material.styl')
        .pipe(plumber())
        .pipe(stylus({ compress: false }))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({ stream: true }));
  });

gulp.task('jade', function () {
    return gulp.src('./**.jade')
        .pipe(plumber())
        .pipe(gulpJade({
            jade: jade,
            pretty: true,
          }))
        .pipe(gulp.dest('./'));
  });

gulp.task('watch', ['connect', 'stylus', 'jade'], function () {
    gulp.watch('./**/*.styl', ['stylus']);
    gulp.watch('./**/*.jade', ['jade']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
  });
