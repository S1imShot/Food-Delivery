![version](https://img.shields.io/badge/version-1.0-red.svg?style=flat-square "Version Frontend-kit")
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/sinups/)

Installation: `npm i`.

Launch: `npm start`.

Assembly - `<b>`Gulp 4`</b>`

Running a specific task: `npm start имя_задачи` (task list in `gulpfile.js`)

Stop: `<kbd>`Ctrl + C`</kbd>`

## Conclusion svg sprite

`<svg class="custom-class" width="14px" height="14px"><use xlink:href="img/sprite-svg.svg#img_name"></use></svg>`

Or you can include at the top of the site below the tag `Body`

`@@include('img/sprite-svg.svg')`

And display it on the page like this:

`<svg  width="28"  height="28"  class="custom_class"><use  xlink:href="#image_name"></use></svg>`

## Conclusion png sprite

The provided mixins are designed for use with variables

` .icon-imagename {   @include sprite($image_name); }`

Example of use in HTML:

`display: block` sprite:

`<div class="icon-imagename"></div>`

Change `display` ( `display: inline-block;`), we suggest using a generic css class:

CSS

`.icon {   display: inline-block; }`

HTML

`<i class="icon icon-home"></i>`

## Update dependencies

Delete:
node_modules
package-lock.json
package.json

Install:
npm install gulp gulp-sass sass gulp-rename gulp-sourcemaps gulp-postcss css-mqpacker gulp-replace del@3.0.0 browser-sync gulp-gh-pages gulp-newer gulp-uglify gulp-concat gulp-cheerio gulp-svgstore gulp-svgmin gulp-notify gulp-plumber gulp-cleancss gulp-file-include gulp-html-beautify gulp.spritesmith merge-stream vinyl-buffernpm install gulp gulp-sass sass gulp-rename gulp-sourcemaps gulp-postcss css-mqpacker gulp-replace del@3.0.0 browser-sync gulp-gh-pages gulp-newer gulp-uglify gulp-concat gulp-cheerio gulp-svgstore gulp-svgmin gulp-notify gulp-plumber gulp-cleancss gulp-file-include gulp-html-beautify gulp.spritesmith merge-stream vinyl-buffer
