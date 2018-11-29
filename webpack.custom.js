const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'custom-loader/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'webpack-loaders')],
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'add-attrs-loader',
            options: {
              attrs: { name: 'Alex', say: 'hello', city: 'Minsk' },
            },
          },
          'remove-attrs-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
  ],
};
