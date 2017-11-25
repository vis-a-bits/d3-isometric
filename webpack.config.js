const path = require('path'),
  webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    library: "d3Isometric",
    libraryTarget: "umd",
    filename: "index.js",
    path: path.resolve(__dirname, 'lib')
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'd3Isometric'
    })
  ]
};