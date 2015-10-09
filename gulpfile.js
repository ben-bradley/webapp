'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),
  babelify = require('babelify'),
  babel = require('gulp-babel'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  runSequence = require('run-sequence'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
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
  srcPublicJs: ['./src/public/index.js'],
  srcPublicHtml: ['./src/public/*.html'],
  srcPublicLess: ['./src/public/*.less'],
  distPublic: 'dist/public',
  distServer: ['dist/**', '!dist/public']
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

  bundler.add(PATHS.srcPublicJs);

  function bundle() {
    gutil.log('public js rebundle');
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


// copy the html into dist
gulp.task('html', function() {
  return gulp.src(PATHS.srcPublicHtml, { base: PATHS.srcBase })
    .pipe(gulp.dest(PATHS.dist));
});


// compile & copy the less/css
gulp.task('less', function() {
  return gulp.src(PATHS.srcPublicLess, { base: PATHS.srcBase })
    .pipe(less())
    .pipe(gulp.dest(PATHS.dist));
});


// set up the watches for changes
gulp.task('watch', function() {
  gulp.watch(PATHS.srcServerJs, ['babel']);
  gulp.watch(PATHS.srcPublicHtml, ['html']);
  gulp.watch(PATHS.srcPublicLess, ['less']);
  gulp.watch(PATHS.distPublic).on('change', livereload.changed);
});


// fire up the server
gulp.task('start', function() {
  runSequence('clean', ['babel', 'bundle', 'html', 'less'], 'watch', function() {
    nodemon({
      env: process.ENV,
      script: 'index.js',
      args: process.argv.slice(2),
      watch: PATHS.distServer
    });
  });
});
