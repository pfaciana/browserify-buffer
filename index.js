'use strict';

const browserify = require('browserify'),
	browserifyStr = require('clean-browserify-string'),
	buffer = require('vinyl-buffer'),
	through2 = require('through2');

const browserifyBuffer = function (transforms = [], opts = {}, useContents = false) {

	return through2.obj(function (file, encoding, cb) {
		let stream = !useContents ? browserify(file.path, opts) : browserifyStr(file.contents.toString(), opts);

		transforms.forEach(transform => {
			stream = stream.transform.apply(stream, Array.isArray(transform) ? transform : [transform]);
		});

		file.contents = stream.bundle();

		buffer().on('data', function (data) {
			this.push(data);
		}.bind(this))._transform.bind(this)(file, encoding, cb);

	});
};

module.exports = browserifyBuffer;

module.exports.contents = (transforms = [], opts = {}) => browserifyBuffer(transforms, opts, true);