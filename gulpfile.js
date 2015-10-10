
var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer');

var messages = {

};
  // First declare config and starter properties which other config properties will use
var config = {
    srcRoot:  '.',
    destRoot: '.'
};
// ...now add other config properties
config.html = {
    src: [config.srcRoot + '/*.html'],
    dest: config.destRoot
  };
config.sass = {
    src: [config.srcRoot + '/Styles/**/*.{sass,scss}'],
    dest: config.destRoot + '/Styles'
  };
config.js = {
    src: [config.srcRoot + '/Scripts/**/*.js'],
    dest: config.destRoot + '/Scripts'
};
console.log(config);

/**
 * Wait for sass task, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'js'], function() {
    browserSync({
        server: {
            //baseDir: '_site'
        }
    });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

/**
 */
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.reload({stream:true}));
});

/**
 */
gulp.task('js', function() {
  return gulp.src(config.js.src)
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.reload({stream:true})); // TODO: test this... with stream-injection, it might screw up state...
});

/**
 * Watch
 */
gulp.task('watch', function () {
    gulp.watch([config.sass.src], ['sass']);
    gulp.watch([config.js.src], ['js']);
    gulp.watch([config.html.src], ['bs-reload']);
});

/**
 * Default task
 */
gulp.task('default', ['browser-sync', 'watch']);
