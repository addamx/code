var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css')

gulp.task('script', function() {
  gulp.src('./src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
})

gulp.task('css', function () {
  gulp.src('./src/css/*.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('./dist/css'))
})


gulp.task('watch', function () {
  gulp.watch('./src/*.*', ['script css'])
});


gulp.task('default', ['css', 'watch'])