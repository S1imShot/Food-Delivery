'use strict';
const dirs = {
    source: 'dev',  // source folder (path from the project root)
    build: 'build', // folder with the result of the work (path from the project root)
};

// Let's determine the necessary tools
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const replace = require('gulp-replace');
const del = require('del');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cheerio = require('gulp-cheerio');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-cleancss');
const include = require('gulp-file-include'); //include
const htmlbeautify = require('gulp-html-beautify');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const buffer = require('vinyl-buffer');

// Preprocessor compilation
gulp.task('sass', function(){
    return gulp.src(dirs.source + '/style.scss') // which file to compile (path from constant)
    .pipe(include())
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init()) // initiate the code map
    .pipe(sass()) // compile
    .pipe(sourcemaps.write('/')) // write the code map as a separate file (path from a constant)
    .pipe(gulp.dest(dirs.build + '/')) // write a CSS file (path from constant)
    .pipe(browserSync.stream())
    .pipe(rename('style.min.css')) // rename
    .pipe(cleanCSS()) // squeeze
    .pipe(gulp.dest(dirs.build + '/')); // write a CSS file (path from constant)
});

// HTML assembly
gulp.task('html', function() {
    return gulp.src(dirs.source + '/*.html') // which files to process (path from constant, name mask)
    .pipe(include())
    .pipe(htmlbeautify())
    .pipe(plumber({ errorHandler: onError }))
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, '')) // remove comments <!--DEV ​​... -->
    .pipe(gulp.dest(dirs.build)); // write files (path from constant)
});


// Copying images
gulp.task('img', function () {
    return gulp.src([
        dirs.source + '/assets/img/*.{gif,png,jpg,jpeg,svg}', // what files to process (path from a constant, name mask, many extensions)
    ],
        {since: gulp.lastRun('img')} // leave in the processing flow only files that have changed since the last launch of the task (in this session)
    )
    .pipe(plumber({ errorHandler: onError }))
    .pipe(newer(dirs.build + '/assets/img')) // leave only new files in the stream (compare with the contents of the build folder)
    .pipe(gulp.dest(dirs.build + '/assets/img')); // write files (path from constant)
});

// Copying images
gulp.task('images', function () {
    return gulp.src([
        dirs.source + '/assets/images/*.{gif,png,jpg,jpeg,svg}', // what files to process (path from a constant, name mask, many extensions)
    ],
        {since: gulp.lastRun('img')} // leave in the processing flow only files that have changed since the last launch of the task (in this session)
    )
    .pipe(plumber({ errorHandler: onError }))
    .pipe(newer(dirs.build + '/assets/images')) // leave only new files in the stream (compare with the contents of the build folder)
    .pipe(gulp.dest(dirs.build + '/assets/images')); // write files (path from constant)
});

// Copying images
gulp.task('imguploads', function () {
    return gulp.src([
        dirs.source + '/uploads/*.{gif,png,jpg,jpeg,svg}', // what files to process (path from a constant, name mask, many extensions)
        dirs.source + '/uploads/**/*.{gif,png,jpg,jpeg,svg}', // what files to process (path from a constant, name mask, many extensions)
    ],
        {since: gulp.lastRun('img')} // leave in the processing flow only files that have changed since the last launch of the task (in this session)
    )
    .pipe(plumber({ errorHandler: onError }))
    .pipe(newer(dirs.build + '/uploads')) // leave only new files in the stream (compare with the contents of the build folder)
    .pipe(gulp.dest(dirs.build + '/uploads')); // write files (path from constant)
});

// Assembling an SVG sprite
gulp.task('svgstore', function (callback) {
    var spritePath = dirs.source + '/assets/img/svg-sprite'; // variable with the path to the SVG sprite sources
        if(fileExist(spritePath) !== false) {
        return gulp.src(spritePath + '/*.svg') // take only SVG files from this folder, ignore subfolders
        // .pipe(plumber({ errorHandler: onError }))
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(rename('sprite-svg.svg'))
        .pipe(gulp.dest(dirs.source + '/assets/img'));
    }
    else {
        console.log('Нет файлов для сборки SVG-спрайта');
        callback();
    }
});

// Assembling an SVG sprite
gulp.task('svgstore', function (callback) {
    var spritePath = dirs.source + '/assets/images/svg-sprite'; // variable with the path to the SVG sprite sources
        if(fileExist(spritePath) !== false) {
        return gulp.src(spritePath + '/*.svg') // take only SVG files from this folder, ignore subfolders
        // .pipe(plumber({ errorHandler: onError }))
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(rename('sprite-svg.svg'))
        .pipe(gulp.dest(dirs.source + '/assets/images'));
    }
    else {
        console.log('Нет файлов для сборки SVG-спрайта');
        callback();
    }
});

// Cleaning up the build folder
gulp.task('clean', function () {
    return del([ // delete
        dirs.build + '/**/*', // all files from the build folder (path from constant)
        '!' + dirs.build + '/readme.md' // except readme.md (path from constant)
    ]);
});

// Moving fonts
gulp.task('copyFonts', function() {
    return gulp.src(dirs.source + '/assets/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}')
    .pipe(gulp.dest('build' + '/assets/fonts'));
});

// Moving styles
gulp.task('copyCSS', function() {
    return gulp.src(dirs.source + '/assets/css/**/*.css')
    .pipe(gulp.dest('build' + '/assets/css'));
});

// Moving scripts
gulp.task('copyJS', function() {
    return gulp.src(dirs.source + '/assets/js/**/*.js')
    .pipe(gulp.dest('build' + '/assets/js'));
});

// Building PHP
gulp.task('php', function() {
    return gulp.src(dirs.source + '/**/**/**/*.php') // which files to process (path from constant, name mask)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, '')) // remove comments <!--DEV ... -->
    .pipe(gulp.dest(dirs.build)); // write files (path from constant)
});

// Building css libraries
gulp.task('copy-css', function() {
    return gulp.src(dirs.source + '/css/blueimp-gallery.min.css')
    .pipe(gulp.dest('build' + '/assets/css'));
});

// Assembling everything
gulp.task('build', gulp.series( // sequentially:
    'clean', // sequentially: cleaning the build folder
    'svgstore',
    gulp.parallel('sass', 'img', 'images', 'imguploads', 'copyFonts', 'copyCSS', 'copyJS'),
    'html',
    'php'
    // sequentially: markup assembly
));

// Local server, tracking
gulp.task('serve', gulp.series('build', function() {
    browserSync.init({ // launch a local server (display, auto-update, synchronization)
        //server: dirs.build, // folder that will be the “root” of the server (path from constant)
        server: {
            baseDir: './build/'
        },
        port: 3000, // port on which the server will run
        startPath: 'index.html', //file that will open in the browser when the server starts
        // open: false // Perhaps you don't need to start the server every time...
    });
    gulp.watch( // watch on the HTML
        [
            dirs.source + '/**/*.html', // in the source folder
        ],
        gulp.series('html', reloader) // when changing files, we start rebuilding HTML and updating in the browser
    );
    gulp.watch( // watch on the HTML
        [
            dirs.source + '**/**/**/**/*.php',                              // in the source folder
            dirs.source + '/modules/*.php', // and in a folder with small inserted files
        ],
        gulp.series('php', reloader) // when changing files, we start rebuilding HTML and updating in the browser
    );
    gulp.watch( // watch
        [
            dirs.source + '/sass/**/*.scss',
            dirs.source + '/sass/*.scss',
            dirs.source + '/*.scss',
        ],
        gulp.series('sass', reloader) // when changing, we start compilation (browser update - in the compilation task)
    );
    gulp.watch( // watch on the SVG
        dirs.source + '/assets/img/svg-sprite/*.svg',
        gulp.series('svgstore', 'html', reloader)
    );
    gulp.watch( // watch on the images
        dirs.source + '/assets/img/*.{gif,png,jpg,jpeg,svg}',
        gulp.series('img', reloader) // when changing, optimize, copy and update in the browser
    );
    
    gulp.watch( // watch on the SVG
        dirs.source + '/assets/images/svg-sprite/*.svg',
        gulp.series('svgstore', 'html', reloader)
    );
    gulp.watch( // watch on the images
        dirs.source + '/assets/images/*.{gif,png,jpg,jpeg,svg}',
        gulp.series('img', reloader) // when changing, optimize, copy and update in the browser
    );
    
    gulp.watch( // watch on the images
        [
            dirs.source + '/uploads/**/*.{gif,png,jpg,jpeg,svg}',
            dirs.source + '/uploads/*.{gif,png,jpg,jpeg,svg}',
        ],
        gulp.series('imguploads', reloader) // when changing, optimize, copy and update in the browser
    );
    gulp.watch( // watch on the JS
        dirs.source + '/assets/js/*.js',
        gulp.series('copyJS', reloader) // when changed, we rebuild and update in the browser
    );
}));

// MANUAL TASK: Posting to GH pages (gh-pages branch of the repository)
gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// Default task
gulp.task('default', gulp.series('serve'));

// Additional function for reloading in browser
function reloader(done) {
    browserSync.reload();
    done();
}

// Checking the existence of a file/folder
function fileExist(path) {
    const fs = require('fs');
    try {
        fs.statSync(path);
    } catch(err) {
        return !(err && err.code === 'ENOENT');
    }
}
var onError = function(err) {
    notify.onError({
        title: 'Error in ' + err.plugin,
    })(err);
    this.emit('end');
};