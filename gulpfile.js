'use strict';

const ENV = process.env.NODE_ENV;

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),
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
  srcPublicJs: [ './src/public/index.js' ],
  srcPublicHtml: [ './src/public/*.html' ],
  srcPublicLess: [ './src/public/*.less' ],
  distPublic: 'dist/public',
  distServer: [ 'dist/**', '!dist/public' ]
};


function _clean(next) {
  rimraf(PATHS.dist + '/*', next);
}

function _babel() {
  return gulp.src(PATHS.srcServerJs, { base: PATHS.srcBase })
    .pipe(babel())
    .pipe(gulp.dest(PATHS.dist));
}

function _bundle() {
  var args = watchify.args;

  var bundler = watchify(browserify(args));

  bundler.add(PATHS.srcPublicJs);

  function bundle() {
    gutil.log('public js rebundle');
    var bundleStream = bundler
      .transform('babelify', { presets: [ 'es2015', 'react' ] })
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'));

    if (ENV === 'production')
      bundleStream
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'));

    return bundleStream.pipe(gulp.dest(PATHS.distPublic));
  }

  bundler.on('update', bundle);

  return bundle();
}

function _html() {
  return gulp.src(PATHS.srcPublicHtml, { base: PATHS.srcBase })
    .pipe(gulp.dest(PATHS.dist));
}

function _less() {
  return gulp.src(PATHS.srcPublicLess, { base: PATHS.srcBase })
    .pipe(less())
    .pipe(gulp.dest(PATHS.dist));
}

function _watch() {
  gulp.watch(PATHS.srcServerJs, [ 'babel' ]);
  gulp.watch(PATHS.srcPublicHtml, [ 'html' ]);
  gulp.watch(PATHS.srcPublicLess, [ 'less' ]);
  gulp.watch(PATHS.distPublic + '/**', livereload.changed);
  livereload.listen();
}

function _start() {
  runSequence('clean', [ 'babel', 'bundle', 'html', 'less' ], 'watch', function _nodemon() {
    nodemon({
      env: process.ENV,
      script: 'index.js',
      args: process.argv.slice(2),
      watch: PATHS.distServer
    });
  });
}

gulp.task('clean', _clean);

gulp.task('babel', _babel);

gulp.task('bundle', _bundle);

gulp.task('html', _html);

gulp.task('less', _less);

gulp.task('watch', _watch);

gulp.task('start', _start);

gulp.task('default', _start);
