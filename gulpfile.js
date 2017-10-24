const path = require('path');
const gulp = require('gulp');
const appfy = require('gulp-appfy-tasks');
const del = require('del');
var browserSync = require('browser-sync');

const isProduction = process.env && process.env.NODE_ENV === 'production';

appfy.init(__dirname, {
    'sourcePath': 'src',
    'destPath': './www/js',
    'assetsTemplate': 'assets/[hash].[ext]',
    'entryCSS': 'css/index.css',
    'entryJS': 'index.js',
    'entryHTML': 'index.html',
    'customWatch': false,
    'browsersync': {
        'port': 3000,
        'notify': false,
        'server': { 'baseDir': './www' }
    },
    'notify': {
        'onError': false,
        'onUpdated': false
    },
    'browserify': {
        watchify: {
            'delay': 100,
            'ignoreWatch': [
                '**/node_modules/**'
            ],
            'poll': false
        },
        sourcemap: true,
        uglify: isProduction,
        options: {
            paths: [path.join(__dirname, 'src')]
        }
    },
    "postcss": {
      "sourcemap": true,
      "plugins": null,
      "options": {}
    }
});


appfy.defineTasks();

// override the "clean" task
gulp.task('clean', cb => {
    del([
        path.join(__dirname, '..', 'www', 'js', 'index.js'),
        path.join(__dirname, '..', 'www', 'js', 'index.js.map')
    ]);

    cb();
});

// var exec = require("child_process").exec;

// gulp.task("cordova-prepare", function() {
//    exec("cordova prepare");
// });

// gulp.task("watch-files", cb => {
//     gulp.watch([
//         __dirname + "/www/**/*.html",
//         __dirname + "/www/**/*.css",
//         __dirname + "/www/**/*.js",
//         __dirname + "/src/**/*.css",
//         __dirname + "/src/**/*.js",
//         __dirname + "/src/**/**/*.js",
//         __dirname + "/src/**/**/*.css"
//     ], ["cordova-prepare"]);

//     cb();
// });