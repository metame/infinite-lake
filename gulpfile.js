var gulp      = require('gulp'),
    watch     = require('gulp-watch'),
    sass      = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    uglify    = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    gulp.src('app/css/*.scss')
        .pipe(watch('app/css/*.scss'))
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('app/css/'));
});

   

gulp.task('minjs', function(){
    gulp.src('app/js/algorithm.js')
        .pipe(watch('app/js/algorithm.js'))
        .pipe(sourcemaps.init())
        .pipe(rename('algorithm.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('callback', function (cb) {
    watch(['app/css/*.scss', 'app/js/algorithm.js'], function () {
        gulp.src(['app/css/*.scss', 'app/js/algorithm.js'])
            .pipe(watch(['app/css/*.scss', 'app/js/algorithm.js']))
            .on('end', cb);
    });
});

gulp.task('default', ['sass', 'minjs', 'callback']);