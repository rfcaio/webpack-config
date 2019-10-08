const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

exports.devServer = (options = {}) => ({
  devServer: merge(
    {
      stats: 'errors-only'
    },
    options
  )
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

exports.useHtmlPlugin = (options = {}) => ({
  plugins: [
    new HtmlWebpackPlugin(merge({ template: 'src/index.html' }, options))
  ]
})
