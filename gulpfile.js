const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    fileinclude = require('gulp-file-include'),
    cssnano = require('cssnano');

const baseSrcPath = './src/**/*.html';
const baseDistPath = './build';


function html() {
    return gulp.src([baseSrcPath])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(baseDistPath));
};

function css() {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./src/styles/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./build/assets/styles'));
}

function watch() {
    gulp.watch('./src/**/*.html',html);
    gulp.watch('./src/styles/*.css',css);
}

const build = gulp.series(watch);
exports.watch = watch;
exports.default = build;