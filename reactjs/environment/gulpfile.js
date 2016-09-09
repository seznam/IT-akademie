require('babel-core/register.js')({
	presets: [require('babel-preset-es2015'), require('babel-preset-react')]
});

let gulp = require('gulp');
let gutil = require('gulp-util');
let babel = require('gulp-babel');
let karma = require('karma');
let path = require('path');
let browserify = require('browserify');
let babelify = require('babelify');
let fs = require('fs');
let less = require('gulp-less');
let concatCss = require('gulp-concat-css');
let gls = require('gulp-live-server');
let watch = require('gulp-watch');

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

gulp.task('bundle', function() {
	var options = { debug: false, insertGlobals : false };

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
		gulp.src('./src/**/*.less')
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

gulp.task('test', function(done) {
	startKarmaServer(done, true);
});

gulp.task('server', function() {
	gulpConfig.server = gls.static('dist', 8888);
	gulpConfig.server.start();
});

// -------------------------------------PRIVATE HELPER TASKS
gulp.task('dev', ['bundle', 'less', 'html', 'server'], (done) => {
	startKarmaServer(done);

	runOnChange('./src/**/*.less', ['less']);
	runOnChange('./src/**/*.html', ['html']);
	runOnChange(['./src/**/*.{js,jsx}'], ['bundle']);
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
