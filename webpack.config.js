'use strict';
var path = require('path');
var isDevelopment = process.env.NODE_ENV === 'development';

const coreConfig = {
	cache: true,
	devtool: 'source-map',
	entry: './src/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		loaders: [
		{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				cacheDirectory: isDevelopment,
				presets: [
				'env',
        		'latest', // contains es2015, 2016 and 2017
        		],
        		plugins: [
        		'transform-runtime',
        		]
        	}
        }
        ]
    }
};

module.exports = coreConfig;