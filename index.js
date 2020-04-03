const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.devServer = (options = {}) => ({
  devServer: merge(
    {
      stats: 'errors-only'
    },
    options
  )
})

exports.extractCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
})

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
})

exports.useErrorOverlayPlugin = () => ({
  plugins: [new ErrorOverlayWebpackPlugin()]
})

exports.useHtmlPlugin = (options = {}) => ({
  plugins: [
    new HtmlWebpackPlugin(merge({ template: 'src/index.html' }, options))
  ]
})
