import webpack from 'webpack';
import livereload from 'livereload';
import livereloadMiddleware from 'connect-livereload';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';

export function devMiddleware(publicPath) {
  const livereloadServer = livereload.createServer();
  livereloadServer.watch(publicPath);
  livereloadServer.server.once('connection', () => {
    setTimeout(() => livereloadServer.sendAllClients(JSON.stringify({
      command: 'reload',
      path: '/'
    })), 100);
  });
  const bundler = webpack(webpackConfig);
  return [
    livereloadMiddleware(),
    webpackDevMiddleware(bundler),
    webpackHotMiddleware(bundler)
  ];
}

export default devMiddleware;
