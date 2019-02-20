require('babel-core/register.js')({
	presets: [require('babel-preset-env'), require('babel-preset-react')]
});

let gulp = require('gulp');
let jasmine = require('gulp-jasmine');
let karma = require('karma');
let path = require('path');
let browserify = require('browserify');
let babelify = require('babelify');
let fs = require('fs');
let less = require('gulp-less');
let concatCss = require('gulp-concat-css');
let gls = require('gulp-live-server');

try {
	fs.mkdirSync('./dist');
} catch (error) {} // eslint-disable-line no-empty
try {
	fs.mkdirSync('./dist/js');
} catch (error) {} // eslint-disable-line no-empty

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

function testJasmine() {
	return gulp
		.src('./src/**/*Spec.js')
		.pipe(jasmine({ includeStackTrace: false }));
}

function bundle() {
	const options = {
		debug: true,
		insertGlobals: false,
		paths: ['./', './src'],
		extensions: ['.jsx']
	};

	return browserify(['./src/main.js'], options)
		.transform(babelify.configure({
			presets: ['env', 'react']
		}))
		.bundle()
		.pipe(fs.createWriteStream('./dist/js/bundle.js'));
}

function compileLess() {
	return gulp
		.src('./src/main.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(concatCss('bundle.css'))
		.pipe(gulp.dest('./dist/css/'));
}

function copyHtml() {
	return gulp
		.src('./src/**/*.html')
		.pipe(gulp.dest('./dist'));
}

function testKarma(done) {
	startKarmaServer(done, true);
}

function server(done) {
	gulpConfig.server = gls.static('dist', 8888);
	gulpConfig.server.start();
	done();
}

function copyStatic() {
	return gulp
		.src('./static/**/*')
		.pipe(gulp.dest('./dist'));
}

function watch() {
	gulp.watch('./src/**/*.less', compileLess);
	gulp.watch('./src/**/*.html', copyHtml);
	gulp.watch(['./src/**/!(*Spec).{js,jsx}'], bundle);
	gulp.watch('./static/**/*', copyStatic);
	gulp.watch(['dist/**/*.js', 'dist/**/*.css', 'dist/**/*.html'], (file) => {
		gulpConfig.server.notify.apply(gulpConfig.server, [file]);
	});
}

exports.dev = gulp.series(
	bundle,
	compileLess,
	copyHtml,
	copyStatic,
	server,
	watch
);

exports.test = gulp.series(
	testKarma,
	(done) => {
		const { JSDOM } = require('jsdom');
		const dom = new JSDOM('<!DOCTYPE html>');
		global.window = dom.window;
		global.document = dom.window.document;
		global.navigator = dom.window.navigator;
		done();
	},
	testJasmine
);

if (gulpConfig.onTerminate) {
	process.on('SIGINT', gulpConfig.onTerminate.bind(null, 'SIGINT'));
	process.on('SIGTERM', gulpConfig.onTerminate.bind(null, 'SIGTERM'));
	process.on('SIGHUP', gulpConfig.onTerminate.bind(null, 'SIGHUP'));
}
