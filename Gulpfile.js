(function initGulpFile() {
    'use strict';

    var gulp    = require('gulp'),
        kit     = require('gulp-kit'),
        sass    = require('gulp-sass'),
        paths   = {
            kit:  './kit/*.kit',
            sass: [ './scss/**/*.scss', './scss/*.scss' ]
        };

    gulp.task('kit', function initKit() {
        gulp
            .src( paths.kit )
            .pipe(kit())
            .pipe(gulp.dest('./'));
    });

    gulp.task('sass', function initSass() {
        gulp
            .src( paths.sass )
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./css'));
    });

    gulp.task('watch', function initWatch() {
        gulp.watch( paths.kit, [ 'kit' ] );
        gulp.watch( paths.sass, [ 'sass' ] );
    });

    gulp.task('default', [
        'kit',
        'sass',
        'watch'
    ]);
})();