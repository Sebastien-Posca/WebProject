const path = require('path');

module.exports = {
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.html$/, loader: 'html' }
        ]
    },
    entry: './src/App.js', // relative path
    output: {
        path: path.join(__dirname, 'public'), // absolute path
        filename: 'bundle.js' // file name
    }
};