// Originally inspired by: https://github.com/shakyShane/jekyll-gulp-sass-browser-sync/blob/master/gulpfile.js
//      and: https://gist.github.com/benske/f80090c87fa97f4e4098

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');

var messages = {

  }
  , srcStylesheets = '_sass'
;


/**
 * Wait for sass task, then launch the Server
 */
//gulp.task('browser-sync', ['sass'], function() {
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            //baseDir: '_site'
        }
    });
});

gulp.task('browser-sync-reload', function() {
  browserSync.reload();
});

/**
 * Compile files from _sass into both _site/css (for live injecting) and site (for future jekyll builds)
 */
 /*
gulp.task('sass', function () {
    //return gulp.src(srcStylesheets + '/style.scss')
    return gulp.src(srcStylesheets + '/*.scss')
        .pipe(sass({
            includePaths: ['scss'], // TODO: check this line... is it applicable for me?  should it be 'sass'?
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        // this one is for the normal build output directory
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        // this one seems to be needed for live-injecting via BrowserSync
        .pipe(gulp.dest('css'));
});
*/

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, reload BrowserSync
 */
gulp.task('watch', function () {
    //gulp.watch([srcStylesheets + '/*.scss'], ['sass']);
    gulp.watch(['index.html'], ['browser-sync-reload']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
