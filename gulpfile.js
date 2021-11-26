/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp = require('gulp');
//var gulp_remove_logging = require("gulp-remove-logging");
var wrench = require('wrench');
/**
 *  This will   load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// gulp.task("remove_logging", function() {
//   return gulp.src("src/javascripts/**/*.js")
//     .pipe(
//       gulp_remove_logging({
//         // Options (optional)
//         // eg:
//         // namespace: ['console', 'window.console']
//       })
//     )
//     .pipe(
//       gulp.dest(
//         "build/javascripts/"
//       )
//     );
// });
