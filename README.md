# Browserify Buffer
Combine Browserify and Buffer into one wrapper for streams.

Browserify's API can used for working with streams, but by itself it is not compatible for receiving and sending buffers, like the Vinyl buffers used in Gulp. One solutions is to use the Gulp Recipe here: https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-transforms.md . However it is a multiple step process. First you need to create the stream in isolation using `bundle()` (which uses a non-Vinyl buffer). Then pipe the stream to `buffer()` to convert it to a useful Vinyl buffer that Gulp can deal with.

This package allows for `browserifyBuffer(transforms, opts)` to be piped at any point in a stream. It accepts, processes and returns a Vinyl buffer. It is designed to used a single step alternative for any Gulp-like stream.

## API

<b><code>browserifyBuffer(transforms = [], options = {})</code></b>

Browserify Buffer accepts two optional arguments.

### transforms

(Array) An optional array of transforms to pass to Browserify

### options

(Object) An optional Browserify options ( Referenced here: https://github.com/browserify/browserify#browserifyfiles--opts )



## Usage

Internally the transforms will get called using `apply`. So each item in the array should be the arguments array for `apply`.

``` js

var browserifyBuffer = require('browserify-buffer');
var babelify = require('babelify');

gulp.task('javascript', function () {
	return gulp.src('./src/**/*.js')
		.pipe(browserifyBuffer([
			[babelify, {presets: ["@babel/preset-env"]}]
		]))
		.pipe(gulp.dest('./dist/'));
});


```

However, if you only need to pass one argument, as in the example below, you do not need to need to make the item an `apply` arguments array. `browserifyBuffer` will automatically convert a non-array input as a singled item array for you.

``` js

var browserifyBuffer = require('browserify-buffer');
var babelify = require('babelify');

gulp.task('javascript', function () {
	return gulp.src('./src/**/*.js')
		.pipe(browserifyBuffer([
			babelify.configure({presets: ["@babel/preset-env"]}),
		]))
		.pipe(gulp.dest('./dist/'));
});


```
