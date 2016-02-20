const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    root: path.join(__dirname, 'node_modules'),
    alias: {
      pixi: path.join(__dirname, 'lib/pixi'),
      phaser: path.join(__dirname, 'lib/phaser'),
      lib: path.join(__dirname, 'lib'),
      assets: path.join(__dirname, 'assets'),
      stores: path.join(__dirname, 'src/stores'),
      core: path.join(__dirname, 'src/core'),
      states: path.join(__dirname, 'src/states'),
      stages: path.join(__dirname, 'src/states/stages'),
      sprites: path.join(__dirname, 'src/sprites'),
      util: path.join(__dirname, 'src/util')
    },
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /phaser\.js$/,
        loader: 'imports?PIXI=pixi'
      },
      {
        test: /\.(png|jpg|mp3|ogg|wav)$/,
        loader: 'file'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(|fnt|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.json$/,
        loader: 'file' // json
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'platformer',
      template: './src/index.html',
      inject: 'body'
    })
  ]
};
