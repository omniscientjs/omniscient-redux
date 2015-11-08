var webpack = require('webpack');

module.exports = {
  entry: process.env.PROD
    ? [ './js/index' ]
    : [ 'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './js/index' ],
  output: {
    path: __dirname + '/build/',
    filename: '[name].entry.js',
    publicPath: '/build'
  },
  plugins: process.env.PROD
    ? []
    : [ new webpack.DefinePlugin({ DEBUG: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin() ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: process.env.PROD
          ? [ 'babel?experimental' ]
          : [ 'react-hot', 'babel?experimental' ]
      },
      {
        test: /\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          "autoprefixer-loader?browsers=last 2 version",
          "less-loader?strictMath&cleancss"
        ]
      }
    ]
  }
};
