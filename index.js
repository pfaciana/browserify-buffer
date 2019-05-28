'use strict';

const browserify = require('browserify'),
	buffer = require('vinyl-buffer'),
	through2 = require('through2');

module.exports = function (transforms = [], opts = {}) {

	return through2.obj(function (file, encoding, cb) {
		let stream = browserify(file.path, opts);

		transforms.forEach(transform => {
			stream = stream.transform.apply(stream, Array.isArray(transform) ? transform : [transform]);
		});

		file.contents = stream.bundle();

		buffer().on('data', function (data) {
			this.push(data);
		}.bind(this))._transform.bind(this)(file, encoding, cb);

	});
};