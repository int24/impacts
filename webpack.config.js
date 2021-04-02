const path = require('path')

module.exports = {
    mode: 'production',
    entry: './lib/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'impacts.js',
        library: 'Impacts',
        libraryTarget: 'window'
    }
}
