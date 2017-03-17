var gulp = require('gulp');
/* ##### PUG ##### */
var pug = require('gulp-pug');
var puginput = './src/*.pug';
var pugoutput = './dist';
gulp.task('pug', function() {
    // Find all .pug files from ./src/
    gulp.src(puginput)
        // Prettifies the html
        .pipe(pug({
            pretty: true
        }))
        // Write resulting HTML in ./dist/
        .pipe(gulp.dest(pugoutput));
});

/* ##### SASS ##### */
var sass = require('gulp-sass');
var sassinput = './src/css/*.scss';
var sassoutput = './dist/css';
var autoprefixer = require('gulp-autoprefixer');
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
gulp.task('sass', function() {
        // Find all .scss files from the ./src/css folder
        gulp.src(sassinput)
        // Run Sass on those files
        .pipe(sass())
        // Run Autoprefixer
        .pipe(autoprefixer(autoprefixerOptions))
        // Write resulting CSS in ./dist/css
        .pipe(gulp.dest(sassoutput));
});

/* ##### ##### */

gulp.task('watch', function() {
    gulp.watch(puginput, ['pug']);
    gulp.watch(sassinput, ['sass']);
});

gulp.task('default', ['pug', 'sass', 'watch']);