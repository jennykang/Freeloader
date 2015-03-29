var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var less = require('gulp-less');
var clean = require('gulp-clean');

var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var watch = require('gulp-watch');
var watchify = require('watchify');

var path = require('path');

var watchport = 8080;

var http = require('http'),
	ecstatic = require('ecstatic');

function bundleScripts(bundler) {
	bundler.transform(babelify)
	return bundler.bundle()
		// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('index.js'))
		// optional, remove if you dont want sourcemaps
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
		.pipe(sourcemaps.write('./')) // writes .map file
		.pipe(gulp.dest('./dist/scripts'));
};

//clean dist directory
gulp.task('clean', function() {
	return gulp.src('dist/*', {read: false})
		.pipe(clean());
});


gulp.task('bootstrap', function() {
	return gulp.src('./bower_components/bootstrap/fonts/*',
		{ base: './bower_components/bootstrap/fonts/' }
	).pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('modules', function() {
	return gulp.src('./vendor/**/*',
		{ base: './vendor' }
	).pipe(gulp.dest('./dist/vendor/'));
});

gulp.task('vendor', ['bootstrap', 'modules']);

gulp.task('images', function() {
	return gulp.src('./images/*')
	.pipe(gulp.dest('./dist/images'));
});

gulp.task('watch', ['default'], function(cb) {

	var bundler = watchify(browserify().add('./scripts/index.js'));
	bundler.on('update', function() {
		gutil.log('recompiling scripts ...');
		bundleScripts(bundler);
	});

	// didnt add js as a dependency was to compile scripts here
	bundleScripts(bundler);

	watch('./*.html', function() {
		gutil.log('copying html ...');
		gulp.start('html');
	});

	watch('./styles/*', function() {
		gutil.log('compiling styles ...');
		gulp.start('css');
	});

	watch('./images/*', function() {
		gutil.log('copying images ...');
		gulp.start('images');
	});


	http.createServer(ecstatic({ root: __dirname + '/dist' })).listen(watchport);

	console.log('watch static server listening on: http://localhost:8080/');

	// no need to watch vendor, should call a full build for that.

});

gulp.task('js', function() {
	return bundleScripts(browserify().add('./scripts/index.js'));
});

gulp.task('html', function() {
	return gulp.src('./index.html')
	.pipe(gulp.dest('./dist'));
});

gulp.task('icon', function() {
	return gulp.src('./favicon.ico')
	.pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {
	return gulp.src('./styles/main.less')
	.pipe(less({
		paths: [ path.join(__dirname, 'styles') ]
	}))
	.on('error', gutil.log.bind(gutil, 'Less Error'))
	.pipe(gulp.dest('./dist/styles'))
});

gulp.task('default', ['js', 'css', 'images', 'icon', 'html', 'vendor']);

