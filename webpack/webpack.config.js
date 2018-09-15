const path              = require('path');
const webpack           = require('webpack');
const htmlPlugin        = require('html-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin');
const dashboardPlugin   = require('webpack-dashboard/plugin');
const autoprefixer      = require('autoprefixer');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const options = {
    host:'localhost',
    port:'1234'
};

module.exports = {
    entry: {
        app: PATHS.app
    },

    output: {
        path: PATHS.build,
        filename: 'wc.bundle.js'
    },

    // optimization: {
    // 	splitChunks: {
    // 	    chunks: 'all'
    // 	}
    // },

    devtool: 'eval-source-map',
    
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: 'errors-only',
        host: options.host,
        port: options.port

    },

    performance: {
	maxEntrypointSize: 51200000,
	maxAssetSize: 51200000
    },
    
    module: {
        rules: [
	    {
		test:require.resolve('jquery'), loader: 'expose-loader?jQuery!expose-loader?$'
	    },
            {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		loader: 'babel-loader',
		query: {
                    cacheDirectory: true,
                    presets: ['es2015']
		}
            },
            {
		test: /\.css$/,
		loaders: ['style-loader', 'css-loader'],
		include:PATHS.app
            },
            {
		test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,       
		loader: 'file-loader',
		query: {
                    name: '[path][name].[ext]'
		}
            },     
            {
		test: /\.scss$/,
		loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },

    plugins:[
        new dashboardPlugin(),
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
        new htmlPlugin({
            template:path.join(PATHS.app,'index.html'),
            inject:'body'
        }),

        new openBrowserPlugin({
            url: `http://${options.host}:${options.port}`
        }),
	
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery':'jquery',
	    Highcharts: "highcharts",
	    Noty: "noty",
        }),
    ]
}
