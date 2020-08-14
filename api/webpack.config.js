const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals')
const path = require('path');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
        filename: '[name].js',
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    externals: [nodeExternals()],
};