const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, 'dist');
const htmlPlugin = new HtmlWebPackPlugin({
  template: `${SRC_DIR}/index.html`,
  filename: './index.html'
})

module.exports = {
  entry: `${SRC_DIR}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [htmlPlugin]
};
