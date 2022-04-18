import 'dotenv/config'
import path from 'path'
import webpack from 'webpack'

const { pathname: __dirname } = new URL('.', import.meta.url)

const clientPath = path.join(__dirname, 'client')
const serverPublicPath = path.join(__dirname, 'server', 'public')

const isDevelopment = process.env.NODE_ENV === 'development'

export default {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
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
  entry: [
    clientPath,
    isDevelopment && 'webpack-hot-middleware/client?timeout=1000'
  ].filter(Boolean),
  output: {
    path: serverPublicPath,
  },
  stats: 'minimal',
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin([]),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new webpack.NoEmitOnErrorsPlugin()
  ].filter(Boolean)
}
