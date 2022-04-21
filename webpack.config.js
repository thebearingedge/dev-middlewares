import 'dotenv/config';
import webpack from 'webpack';

const isDevelopment = process.env.NODE_ENV === 'development';

const client = new URL('./client', import.meta.url);
const serverPublic = new URL('./server/public', import.meta.url);

export default {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: [
    client.pathname,
    isDevelopment && 'webpack-hot-middleware/client?timeout=1000'
  ].filter(Boolean),
  output: {
    path: serverPublic.pathname
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  stats: 'minimal',
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new webpack.NoEmitOnErrorsPlugin()
  ].filter(Boolean)
};
