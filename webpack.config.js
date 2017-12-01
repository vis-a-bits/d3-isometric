const path = require('path'),
  webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    //library: "d3Isometric",
    library: ["d3", "isometric"],
    libraryTarget: "umd",
    filename: "index.js",
    path: path.resolve(__dirname, 'lib')
  }
};