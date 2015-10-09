'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  // glob = require('glob'),
  // path = require('path'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),
  babelify = require('babelify'),
  babel = require('gulp-babel'),
  // nodemon = require('gulp-nodemon'),
  // livereload = require('gulp-livereload'),
  uglify = require('gulp-uglify'),
  // less = require('gulp-less'),
  rimraf = require('rimraf'),
  debug = require('debug')('gulpfile');

var PATHS = {
  dist: 'dist',
  srcBase: './src/',
  srcServerJs: [
    'src/*.js',
    'src/handlers/*.js',
    'src/controllers/*.js',
    'src/routes/*.js',
    '!src/public'
  ],
  srcPublicIndex: './src/public/index.js',
  distPublic: 'dist/public'
};

// zap the dist/ folder
gulp.task('clean', function(next) {
  rimraf(PATHS.dist + '/*', next);
});

// converts server-side es6 to es5
gulp.task('babel', function() {
  return gulp.src(PATHS.srcServerJs, { base: PATHS.srcBase })
    .pipe(babel())
    .pipe(gulp.dest(PATHS.dist));
});

// do all the UI compiling
gulp.task('bundle', function() {

  var args = watchify.args;
  args.transform = [ reactify, babelify ];

  var bundler = watchify(browserify(args));

  bundler.add(PATHS.srcPublicIndex);

  function bundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(PATHS.distPublic));
  }

  bundler.on('update', bundle);

  bundle();

});

// gulp.task('default', ['nodemon'], function () {
//   debug('gulp default');
// });
//
// // Compile JSX into JS
// gulp.task('bundle', function () {
//   bundler(__dirname + '/src/client/app.js');
// });
//
// function bundler(file) {
//   var watchArgs = watchify.args;
//   watchArgs.transform = [reactify, babelify];
//   var Bundler = watchify(browserify(watchArgs));
//   var uiRoot = path.dirname(file) + '/..';
//   Bundler.add(file);
//
//   debug('BUNDLE:', file);
//
//   function bundle() {
//     debug('BUNDLING: ' + file);
//     return Bundler.bundle()
//       .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//       .pipe(source('app.js'))
//       .pipe(gulp.dest('dist/client'));
//   };
//   Bundler.on('update', bundle);
//   bundle();
// }
//
// // Copy an HTML file into /dist
// gulp.task('html', function () {
//   glob.sync('src/client/**.html').forEach(html);
// });
//
// function html(file) {
//   gulp.src(file)
//     .pipe(gulp.dest('dist/client'));
// }
//
// // Less the CSS
// gulp.task('less', function () {
//   debug('LESS: src/client/*.less');
//   glob.sync('src/client/*.less').forEach(lessIt);
// });
//
// function lessIt(file) {
//   debug('LESSING: ' + file);
//   gulp.src(file)
//     .pipe(less())
//     .pipe(gulp.dest('dist/client'));
// }
//
// // Monitor the app
// gulp.task('nodemon', ['babel', 'html', 'less', 'bundle'], function () {
//   // watch for new HTMLs and publish them
//   gulp.watch('src/client/**.html', function (ev) {
//     html(ev.path);
//   });
//
//   gulp.watch('src/client/main.less', function (ev) {
//     lessIt(ev.path);
//   });
//
//   gulp.watch('src/server/*.js', function (ev) {
//
//     return gulp.src(ev.path)
//       .pipe(babel())
//       .pipe(gulp.dest('dist/server'));
//   })
//
//   gulp.watch('dist/client/*', function (ev) {
//     livereload.reload();
//   });
//
//   livereload.listen();
//
//   // start the server
//   nodemon({
//     env: process.ENV,
//     script: 'index.js',
//     args: process.argv.slice(2),
//     watch: ['dist/server/*']
//   });
// });
