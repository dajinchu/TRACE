const path = require('path');
const webpack = require('webpack');
const CSSPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main-bundle.js',
  },
  plugins: [
    new CSSPlugin({
      chunkFilename: 'style.bundle.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [CSSPlugin.loader, 'css-loader'],
        include: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        use: [CSSPlugin.loader, 'css-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
    ],
  },

};
