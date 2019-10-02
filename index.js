const merge = require('webpack-merge')

exports.devServer = (options = {}) => ({
  devServer: merge(
    {
      stats: 'errors-only'
    },
    options
  )
})
