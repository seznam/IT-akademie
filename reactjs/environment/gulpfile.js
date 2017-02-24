require('babel-core/register.js')({
	presets: [require('babel-preset-es2015'), require('babel-preset-react')]
});

let gulp = require('gulp');
let gutil = require('gulp-util');
//let babel = require('gulp-babel');
let jasmine = require('gulp-jasmine');
//let karma = require('karma');
let path = require('path');
let browserify = require('browserify');
//let babelify = require('babelify');
let fs = require('fs');
let less = require('gulp-less');
let concatCss = require('gulp-concat-css');
let gls = require('gulp-live-server');
let gulpWatch = require('gulp-watch');

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

// function startKarmaServer(done, singleRun) {
// 	new karma.Server({
// 		configFile: path.resolve('./karma.conf.js'),
// 		singleRun: singleRun
// 	}, done).start();
// }

//run test
function testJasmine() {
	return gulp.src('./src/**/*Spec.js')
		.pipe(jasmine({ includeStackTrace: false }));
}

function bundle() {
	var options = { debug: true, insertGlobals : false, paths: ['./', './src'], extensions: ['.jsx'] };

	return (
		browserify(['./src/main.js'], options)
			.transform('babelify', {
				babelrc: false,
				presets: ['es2015', 'react']
			})
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
}

function compileLess() {
	return (
		gulp.src('./src/main.less')
			.pipe(less({
				paths: [path.join(__dirname, 'less', 'includes')]
			}))
			.pipe(concatCss('bundle.css'))
			.pipe(gulp.dest('./dist/css/'))
	);
}

function html() {
	return (
		gulp.src('./src/**/*.html')
			.pipe(gulp.dest('./dist'))
	);
}

function server() {
	gulpConfig.server = gls.static('dist', 8888);
	gulpConfig.server.start();
}

function staticFiles() {
	return gulp.src('./static/**/*')
			.pipe(gulp.dest('./dist'));
}

exports.dev = gulp.series(
	bundle,
	compileLess,
	html,
	staticFiles,
	gulp.parallel(
		server,
		function watch() {
			runOnChange('./src/**/*.less', compileLess);
			runOnChange('./src/**/*.html', html);
			runOnChange(['./src/**/!(*Spec).{js,jsx}'], bundle);
			runOnChange('./src/**/*Spec.{js,jsx}', testJasmine);
			runOnChange('./static/**/*', staticFiles);
			gulp.watch(['dist/**/*.js', 'dist/**/*.css', 'dist/**/*.html'], function notifyServer(file) {
				gulpConfig.server.notify.apply(gulpConfig.server, [file]);
			});
			
			function runOnChange(files, task) {
				gulpWatch(files, gulp.series(task));
			}
		}
	)
);

if (gulpConfig.onTerminate) {
	process.on('SIGINT', gulpConfig.onTerminate.bind(null, 'SIGINT'));
	process.on('SIGTERM', gulpConfig.onTerminate.bind(null, 'SIGTERM'));
	process.on('SIGHUP', gulpConfig.onTerminate.bind(null, 'SIGHUP'));
}
