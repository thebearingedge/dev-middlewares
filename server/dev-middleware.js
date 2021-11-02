const webpack = require('webpack')
const livereload = require('livereload')
const livereloadMiddleware = require('connect-livereload')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')

module.exports = function devMiddleware(publicPath) {
  const livereloadServer = livereload.createServer()
  livereloadServer.watch(publicPath)
  const bundler = webpack(config)
  return [
    livereloadMiddleware(),
    webpackDevMiddleware(bundler, { stats: 'minimal' }),
    webpackHotMiddleware(bundler)
  ]
}
