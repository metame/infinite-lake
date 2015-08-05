var gulp      = require('gulp'),
    watch     = require('gulp-watch'),
    sass      = require('gulp-sass'),
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    uglify    = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    gulp.src('app/css/*.scss')
        .pipe(watch('app/css/*.scss'))
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('app/css/'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('app/css/'));
});

   

gulp.task('minjs', function(){
    gulp.src('app/js/algorithm.js')
        .pipe(watch('app/js/algorithm.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(rename('algorithm.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/js'));
});

// TODO: add js files to gulp watch
gulp.task('callback', function (cb) {
    watch('app/css/*.css', function () {
        gulp.src('app/css/*.css')
            .pipe(watch('app/css/*.css'))
            .on('end', cb);
    });
});

gulp.task('default', ['sass', 'minjs', 'callback']);