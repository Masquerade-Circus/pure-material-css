// Include gulp
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    stylus = require('stylus'),
    gulpStylus = require('gulp-stylus'),
    pug = require('pug'),
    gulpPug = require('gulp-pug'),
    fs = require('fs');

gulpStylus.stylus = stylus;

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
    return gulp.src('./styl/**/*.styl')
        .pipe(plumber())
        .pipe(gulpStylus({ compress: true, sourcemap: true }))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('pug', function () {
    return gulp.src('./**.pug')
        .pipe(plumber())
        .pipe(gulpPug({
            pug: pug,
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['connect', 'stylus', 'pug'], function () {
    gulp.watch('./**/*.styl', ['stylus']);
    gulp.watch('./**/*.pug', ['pug']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('build', function () {
    var colors = [
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
        };


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
                        if (err)
                            console.log(err);

                        let fileName = './build_styles/pure-material-' + toSnake(primary) + '-' + toSnake(accent) + '.css';
                        fs.writeFile(fileName, css, {encoding : 'utf8'}, function (err) {
                            if (err)
                                console.log(err);

                            console.log('Writed ' + fileName);
                        });
                    });
            }
        }

    }


});
