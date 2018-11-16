const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/js/app.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
