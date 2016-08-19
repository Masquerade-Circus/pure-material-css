// Include gulp
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    gulpStylus = require('gulp-stylus'),
    jade = require('jade'),
    gulpJade = require('gulp-jade'),
    fs = require('fs');

gulp.task('connect', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false,
        port: 8080,
        injectChanges: true,
        codeSync: true
    });
});

gulp.task('stylus', function () {
    return gulp.src('./styl/pure-material.styl')
        .pipe(plumber())
        .pipe(gulpStylus({ compress: false }))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('jade', function () {
    return gulp.src('./**.jade')
        .pipe(plumber())
        .pipe(gulpJade({
            jade: jade,
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['connect', 'stylus', 'jade'], function () {
    gulp.watch('./**/*.styl', ['stylus']);
    gulp.watch('./**/*.jade', ['jade']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('build', function () {
    var stylus = gulpStylus.stylus,
        colors = [
            'Red',
            'Pink',
            'Purple',
            'Deep Purple',
            'Indigo',
            'Blue',
            'Light Blue',
            'Cyan',
            'Teal',
            'Green',
            'Light Green',
            'Lime',
            'Yellow',
            'Amber',
            'Orange',
            'Deep Orange',
            'Brown',
            'Grey',
            'Blue Grey'
        ],
        toSnake = function (string) {
            var split = string.split(' ');
            for (let i = 0; i < split.length; i++) {
                split[i] = split[i].toLowerCase();
            }

            return split.join('-');
        }


    for (let i = 0; i < colors.length; i++) {
        let primary = colors[i];
        for (let c = 0; c < colors.length; c++) {
            let accent = colors[c];
            if (primary !== accent) {
                stylus(fs.readFileSync('./styl/pure-material.styl', 'utf-8'))
                    .set('compress', true)
                    .define('primary-color', primary)
                    .define('accent-color', accent)
                    .include('./styl')
                    .render(function (err, css) {
                        if (err) {
                            console.log(err);
                        }

                        fs.writeFile('./css/pure-material-' + toSnake(primary) + '-' + toSnake(accent) + '.css', css, {encoding : 'utf8'});
                    });
            }
        }

    }


});
