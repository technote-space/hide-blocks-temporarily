/**
 * @version 0.0.1
 * @author Technote
 * @since 0.0.1
 * @copyright Technote All Rights Reserved
 * @license http://www.opensource.org/licenses/gpl-2.0.php GNU General Public License, version 2
 * @link https://technote.space/
 */
const webpack = require( 'webpack' );
const p = require( './package' );

const banner = `${p.name} ${p.version}\nCopyright (c) ${ new Date().getFullYear() } ${p.author}\nLicense: ${p.license}`;

const webpackConfig = {
	context: __dirname + '/src',
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
				loader: 'babel-loader',
			},
		],
	},
	externals: {
		lodash: 'lodash',
	},
	plugins: [
		new webpack.BannerPlugin( banner ),
	],
};

module.exports = webpackConfig;