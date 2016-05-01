var gulp = require('gulp')
  , useref = require('gulp-useref')
  , uglify = require('gulp-uglify')
  , gulpIf = require('gulp-if')
  , cssnano = require('gulp-cssnano')
  , imagemin = require('gulp-imagemin')
  , cache = require('gulp-cache')
  , csscomb = require('gulp-csscomb')
  , cssbeautify = require('gulp-cssbeautify')
  , autoprefixer = require('gulp-autoprefixer')
  , source = './app/assets/'
  , dist = './dist/assets/'
  ;

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src(source + 'img/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest(dist + 'img'))
});

gulp.task('watch', function(){
  gulp.watch(source + 'css/**/*.css', ['useref']);
  gulp.watch(source + 'js/**/*.js', ['useref']);
  // Other watchers
})
