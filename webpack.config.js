const path = require('path');
const stream = require('stream-browserify');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify")
        }
    }

};
