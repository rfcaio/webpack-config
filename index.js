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

exports.useHtmlPlugin = (options = {}) => ({
  plugins: [
    new HtmlWebpackPlugin(merge({ template: 'src/index.html' }, options))
  ]
})
