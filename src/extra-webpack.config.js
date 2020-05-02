
/**
 * Ignore all locale files in momemt
 * Current size of moment approx 52kb (Without this it takes approx 450kb)
 */

'use strict';

const webpack = require('webpack');

module.exports = {
	plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
};