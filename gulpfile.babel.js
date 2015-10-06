'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const ghostConfig = require('./config');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const babelify = require('babelify');
const watchify = require('watchify');
const reload = browserSync.reload;

let paths = {
  styles: './content/themes/NodeGreenville/src/sass/main.scss',
  scripts: './content/themes/NodeGreenville/src/scripts/index.js',
  assets: './content/themes/NodeGreenville/assets',
  src: './content/themes/NodeGreenville/src',
  theme: './content/themes/NodeGreenville'
};

function bundle (bundler) {
  return bundler
    .transform(babelify)
    .bundle()
    .on('error', function (e) {
      gutil.log(e);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(`${paths.assets}/js`))
    .pipe(browserSync.stream());
}

gulp.task('js', function () {
  return bundle(browserify(paths.scripts));
});

gulp.task('sass', function() {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${paths.assets}/css`))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'js'], function() {

  browserSync.init({
    proxy: ghostConfig.development.url
  });

  // watch JavaScript and rebundle
  let watcher = watchify(browserify(paths.scripts, watchify.args));

  bundle(watcher);

  watcher.on('update', function () {
    bundle(watcher);
  });

  watcher.on('log', gutil.log);

  // watch Sass files
  gulp.watch(`${paths.src}/sass/**/*.scss`, ['sass']);

  gulp.watch(`${paths.theme}/**/*.hbs`).on('change', reload);
});

gulp.task('default', ['serve']);