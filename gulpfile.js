// Include gulp
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    stylus = require('stylus'),
    gulpStylus = require('gulp-stylus'),
    pug = require('pug'),
    gulpPug = require('gulp-pug'),
    fs = require('fs'),
    gulpFn = require('gulp-fn'),
    cssnano = require('cssnano'),
    CleanCSS = require('clean-css');

let CleanCSSOptions = {
    level: {
        1: {
            roundingPrecision: 'all=3', // rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
            specialComments: 'none' // denotes a number of /*! ... */ comments preserved; defaults to `all`
        },
        2: {
            restructureRules: true // controls rule restructuring; defaults to false
        }
    },
    compatibility: 'ie11'
};

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
        .pipe(gulpStylus({ compress: false, sourcemap: true }))
        // .pipe(gulpFn(file => {
        //     file.contents = new Buffer(new CleanCSS(CleanCSSOptions).minify(file.contents.toString()).styles, 'utf-8');
        //     return file;
        // }))
        // .pipe(gulpFn(file => {
        //     return cssnano.process(file.contents.toString()).then(function (result) {
        //         file.contents = new Buffer(result.css, 'utf-8');
        //         return file;
        //     });
        // }))
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
            'Amber',
            'Blue Grey',
            'Blue',
            'Brown',
            'Cyan',
            'Deep Orange',
            'Deep Purple',
            'Green',
            'Grey',
            'Indigo',
            'Light Blue',
            'Light Green',
            'Lime',
            'Orange',
            'Pink',
            'Purple',
            'Teal',
            'Yellow',
            'Red'
        ],
        toSnake = function (string) {
            var split = string.split(' ');
            for (let i = 0; i < split.length; i++) {
                split[i] = split[i].toLowerCase();
            }

            return split.join('-');
        },
        file = fs.readFileSync('./styl/pure-material.styl', 'utf-8'),
        slimfile = fs.readFileSync('./styl/pure-material-slim.styl', 'utf-8'),
        renderFactory = function (primary, accent, slim = false) {
            return new Promise((resolve, reject) => {
                let fileName = './build_styles/' + (slim ? 'slim/' : '') + 'pure-material-' + toSnake(primary) + '-' + toSnake(accent) + (slim ? '-slim' : '') + '.css';
                console.log('Writing ' + fileName);
                stylus(slim ? slimfile : file)
                    .set('compress', false)
                    .define('primary-color', primary)
                    .define('accent-color', accent)
                    .include('./styl')
                    .render(function (err, css) {
                        if (err)
                            return reject(err);

                        css = new CleanCSS(CleanCSSOptions).minify(css).styles;
                        cssnano.process(css).then(function (result) {
                            fs.writeFile(fileName, result.css, {encoding : 'utf8'}, function (err) {
                                if (err)
                                    return reject(err);

                                console.log('Writed ' + fileName);
                                resolve(fileName);
                            });
                        });
                    });
            });

        };

    let colors2 = [];
    for (let c of colors) {
        colors2.push(c);
    }

    let renderColors = function () {
        if (colors.length <= 0) {
            return Promise.resolve();
        }

        let primary = colors.shift();
        console.log('');
        console.log('************** Rendering ' + primary + ' Set **************');
        let promises = [];
        for (let c = 0; c < colors2.length; c++) {
            let accent = colors2[c];
            if (primary !== accent) {
                promises.push(renderFactory(primary, accent));
                promises.push(renderFactory(primary, accent, true));
            }
        }

        return Promise.all(promises).then(() => renderColors());
    };

    return renderColors().then(() => console.log('Done'));


    // let promises = [];
    //
    // for (let i = 0; i < colors.length; i++) {
    //     let primary = colors[i];
    //     for (let c = 0; c < colors.length; c++) {
    //         let accent = colors[c];
    //         if (primary !== accent) {
    //             promises.push(renderFactory(primary, accent));
    //             promises.push(renderFactory(primary, accent, true));
    //         }
    //     }
    //
    // }
    //
    // return Promise.all(promises);

});
