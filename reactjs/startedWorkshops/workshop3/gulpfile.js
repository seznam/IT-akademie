require('babel-core/register.js')({
	presets: [require('babel-preset-es2015'), require('babel-preset-react')]
});

let gulp = require('gulp');
let gutil = require('gulp-util');
let babel = require('gulp-babel');
let jasmine = require('gulp-jasmine');
let karma = require('karma');
let path = require('path');
let browserify = require('browserify');
let babelify = require('babelify');
let fs = require('fs');
let less = require('gulp-less');
let concatCss = require('gulp-concat-css');
let gls = require('gulp-live-server');
let watch = require('gulp-watch');

try {
	fs.mkdirSync('./dist');
} catch (error) {}
try {
	fs.mkdirSync('./dist/js');
} catch (error) {}

let gulpConfig = {
	onTerminate: () => {
		if (gulpConfig.server) {
			gulpConfig.server.stop();
		}

		setTimeout(() => {
			process.exit();
		});
	},
	server: null
};

function startKarmaServer(done, singleRun) {
	new karma.Server({
		configFile: path.resolve('./karma.conf.js'),
		singleRun: singleRun
	}, done).start();
}

//run test
gulp.task('test:jasmine', () =>
	gulp.src('./src/**/*Spec.js')
		.pipe(jasmine({ includeStackTrace: false }))
);

gulp.task('bundle', function() {
	var options = { debug: true, insertGlobals : false, paths: ['./', './src'], extensions: ['.jsx'] };

	return (
		browserify(['./src/main.js'], options)
			.transform(babelify.configure({
				presets: ['es2015', 'react']
			}))
			.bundle()
			.on('error', function(err) {
				gutil.log(
					gutil.colors.red("Browserify compile error:"),
					err.message
				);
				this.emit('end');
			})
			.pipe(fs.createWriteStream('./dist/js/bundle.js'))
	);
});

gulp.task('less', function() {
	return (
		gulp.src('./src/main.less')
			.pipe(less({
				paths: [path.join(__dirname, 'less', 'includes')]
			}))
			.pipe(concatCss('bundle.css'))
			.pipe(gulp.dest('./dist/css/'))
	);
});

gulp.task('html', function() {
	return (
		gulp.src('./src/**/*.html')
			.pipe(gulp.dest('./dist'))
	);
});

gulp.task('test:karma', function(done) {
	startKarmaServer(done, true);
});

gulp.task('server', function() {
	gulpConfig.server = gls.static('dist', 8888);
	gulpConfig.server.start();
});

gulp.task('static', () => {
	return gulp.src('./static/**/*')
			.pipe(gulp.dest('./dist'));
});

// -------------------------------------PRIVATE HELPER TASKS
gulp.task('dev', ['bundle', 'less', 'html', 'static', 'server'], (done) => {
	//startKarmaServer(done);

	runOnChange('./src/**/*.less', ['less']);
	runOnChange('./src/**/*.html', ['html']);
	runOnChange(['./src/**/!(*Spec).{js,jsx}'], ['bundle']);
	//runOnChange('./src/**/*.{js,jsx}', ['test:jasmine']);
	runOnChange('./static/**/*', ['static']);
	gulp.watch(['dist/**/*.js', 'dist/**/*.css', 'dist/**/*.html'], (file) => {
		gulpConfig.server.notify.apply(gulpConfig.server, [file]);
	});

	function runOnChange(files, tasks) {
		watch(files, () => {
			gulp.start(tasks);
		});
	}
});

if (gulpConfig.onTerminate) {
	process.on('SIGINT', gulpConfig.onTerminate.bind(null, 'SIGINT'));
	process.on('SIGTERM', gulpConfig.onTerminate.bind(null, 'SIGTERM'));
	process.on('SIGHUP', gulpConfig.onTerminate.bind(null, 'SIGHUP'));
}