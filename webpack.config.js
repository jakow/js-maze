'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
const modulePaths = [
'src'
];

const sassPaths = [];

const extractSass = new ExtractTextPlugin({
	filename: './css/[name].[contenthash].css',
	disable: isDevelopment
});

const embedHtml = new HtmlPlugin({
	template: './src/index.html'
});


const coreConfig = {
	// cache: true,
	devtool: 'source-map',
	entry: './src/app.js',
	// path where to look for imports
	resolve: {
		modules: [...modulePaths.map(p => path.resolve(__dirname, p)), 'node_modules'],
	},
	output: {
		filename: isDevelopment ? 'main.js' : 'main.[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [{
					loader: 'babel-loader',
					options: {
						cacheDirectory: isDevelopment,
						presets: [
						'env',
						// contains es2015, 2016 and 2017. Modules: false to prevent babel transpiling to commonjs
						['latest',  {'modules': false }],
						],
						plugins: [
							'transform-runtime',
						]
					}
				},]
			},
			{
				test: /\.html$/,
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'sass-loader'
					}],
					// use style-loader in development
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [ 
		extractSass, 
		embedHtml, 
		new CircularDependencyPlugin({failOnError: true})
	]
};

module.exports = coreConfig;