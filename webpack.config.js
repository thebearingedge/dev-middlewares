import 'dotenv/config';
import webpack from 'webpack';

const isDevelopment = process.env.NODE_ENV === 'development';

const clientURL = new URL('./client', import.meta.url);
const serverPublicURL = new URL('./server/public', import.meta.url);

export default {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: [
    clientURL.pathname,
    isDevelopment && 'webpack-hot-middleware/client?timeout=1000'
  ].filter(Boolean),
  output: {
    path: serverPublicURL.pathname
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ],
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  stats: 'minimal',
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin([]),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new webpack.NoEmitOnErrorsPlugin()
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    }
  }
};
