var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'easy-text-match.js',
    library: 'easyTextMatch',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
};