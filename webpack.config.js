const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const environment = process.env.NODE_ENV

console.log(environment)
const miniExtract = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js'
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [miniExtract],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-object-rest-spread',
              ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-export-default-from'
            ]
          }
        }
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  watch: environment === 'development',
  mode: environment,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: true,
    poll: 500
  }
}
