//Gulp Packages
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

// const pug = require("gulp-pug");

const imagemin = require('gulp-imagemin');

const sass = require("gulp-sass");
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss')

const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");
const uglify = require('gulp-uglify');

const notify = require('gulp-notify');

//Global Variables
var production = false;

//Path Definitions
const paths = {
  html: {
    src: "*.html",
    dest: "dist"
  },
  scripts: {
    src: "scripts/*.ts",
    dest: "dist/scripts"
  },
  styles: {
    main_scss_src: "stylesheets/**/main.scss",
    src: "stylesheets/**/*.scss",
    dest: "stylesheets/css"
  },
  images: {
    src: "assets/images/**/*",
    dest: "assets/images"
  }
}

//Internal Tasks

function styles() {
  let sassOptions = {};
  if (production) {
    sassOptions = {
      outputStyle: 'compressed'
    }
  }
  return gulp.src(paths.styles.main_scss_src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(gulpIf(production, imagemin()))
    .pipe(gulp.dest(paths.images.dest))
}

//External Tasks

gulp.task("default",
  gulp.parallel(styles, images)
);

gulp.task('production', gulp.series((done) => { production = true;
  done(); }, 'default'));

gulp.task("serve", gulp.series('default', () => {
  browserSync.init({
    server: "./"
  });
  gulp.watch(paths.styles.src, gulp.series(styles));
  gulp.watch(paths.images.src, gulp.series(images));
  gulp.watch(paths.scripts.src).on('change', browserSync.reload);
  gulp.watch(paths.html.src).on('change', browserSync.reload);
}));
