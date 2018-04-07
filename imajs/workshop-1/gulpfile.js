let gulpConfig = require('ima-gulp-tasks/gulpConfig.js');

gulpConfig.tasks.dev = [
    ['copy:appStatic', 'copy:environment', 'shim', 'polyfill'],
	['Es6ToEs5:app', 'Es6ToEs5:server', 'Es6ToEs5:vendor'],
	['less', 'locale', 'Es6ToEs5:vendor:client', 'Es6ToEs5:vendor:client:test'],
	'server',
	['watch']
];

module.exports = require('ima-gulp-task-loader')([
	'./node_modules/ima-gulp-tasks/tasks',
	'./app/gulp/tasks'
], gulpConfig);
