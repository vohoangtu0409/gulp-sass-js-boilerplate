const { watch,series, parallel,src, dest  } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
sass.compiler = require('node-sass');
var removeEmptyLines = require('gulp-remove-empty-lines');

function defaultTask(cb) {
  cb();
}
function jsTask(cb){
return src([
	'src/js/function.js', 
	])
	.pipe(concat('app.js'))
	.pipe(dest('dist/js'));
	cb();
}
function scssTask(cb){
  return src("src/scss/**/*.scss")
  .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
  .pipe(removeEmptyLines())
  .pipe(dest('dist/css'));
  cb();
}
function watchFile(cb) {
  watch('src/scss/**/*.scss', scssTask);
  watch('src/js/**/*.js', jsTask);
  cb();
}
exports.default = series(defaultTask,watchFile);