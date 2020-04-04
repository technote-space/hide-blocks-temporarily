const SpeedMeasurePlugin            = require('speed-measure-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const HardSource                    = require('hard-source-webpack-plugin');
const smp                           = new SpeedMeasurePlugin();
const webpack                       = require('webpack');
const pkg                           = require('./package');
const path                          = require('path');

const banner    = `${pkg.name} ${pkg.version}\nCopyright (c) ${new Date().getFullYear()} ${pkg.author.name}\nLicense: ${pkg.license}`;
const externals = {
	'@wordpress/block-editor': 'window.wp.blockEditor',
	'@wordpress/blocks': 'window.wp.blocks',
	'@wordpress/components': 'window.wp.components',
	'@wordpress/compose': 'window.wp.compose',
	'@wordpress/data': 'window.wp.data',
	'@wordpress/edit-post': 'window.wp.editPost',
	'@wordpress/element': 'window.wp.element',
	'@wordpress/hooks': 'window.wp.hooks',
	'@wordpress/plugins': 'window.wp.plugins',
	lodash: 'lodash',
};

const webpackConfig = {
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'index.min.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory',
			},
		],
	},
	externals,
	plugins: [
		new webpack.BannerPlugin(banner),
		new DuplicatePackageCheckerPlugin(),
		new HardSource(),
	],
};

module.exports = smp.wrap(webpackConfig);
