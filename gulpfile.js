const gulp = require('gulp'),
    htmlPartial = require('gulp-html-partial'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano');

function html() {
    return gulp.src(['src/**/*.html'])
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulp.dest('build'));
};


function css() {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./src/styles/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./build/styles'));
}

function watch() {
    gulp.watch('./src/**/*.html',html);
    gulp.watch('./src/styles/*.css',css);
}

const build = gulp.series(watch);
exports.watch = watch;
exports.default = build;