var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    uglify    = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    gulp.src('app/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/css/'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/css/'));
});

   

gulp.task('minjs', function(){
    gulp.src('app/js/algorithm.js')
        .pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(rename('algorithm.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('default', ['sass', 'minjs']);