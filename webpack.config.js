/* eslint-disable no-undef */
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        index: ['./src/index.ts']
    },
    output: {
        filename: 'ezlite-react.js',
        path: path.join(__dirname, 'dist/umd'),
        library: 'ezlite',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.build.json'
                }
            },
            // {
            //     // scss loader
            //     test: /\.scss$/,
            //     use: [
            //        'style-loader',
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        dayjs: 'dayjs'
    }
};
