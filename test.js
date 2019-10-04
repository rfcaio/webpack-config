const config = require('.')

describe('devServer', () => {
  test('should return default settings for `webpack-dev-server` when no options are passed', () => {
    expect(config.devServer()).toEqual({
      devServer: {
        stats: 'errors-only'
      }
    })
  })

  test('should merge options with default settings', () => {
    const options = {
      historyApiFallback: true,
      port: 1337
    }
    expect(config.devServer(options)).toEqual({
      devServer: {
        historyApiFallback: true,
        port: 1337,
        stats: 'errors-only'
      }
    })
  })

  test('should override default settings', () => {
    const options = {
      port: 1337,
      stats: 'verbose'
    }
    expect(config.devServer(options)).toEqual({
      devServer: {
        port: 1337,
        stats: 'verbose'
      }
    })
  })
})

describe('useHtmlPlugin', () => {
  test('should return default settings for `html-webpack-plugin` when no options are passed', () => {
    expect(config.useHtmlPlugin()).toMatchObject({
      plugins: expect.any(Array)
    })
    const [htmlWebpackPluginSetting] = config.useHtmlPlugin().plugins
    expect(htmlWebpackPluginSetting.options).toHaveProperty(
      'template',
      'src/index.html'
    )
  })

  test('should merge options with default settings', () => {
    const [htmlWebpackPluginSetting] = config.useHtmlPlugin({
      minify: true
    }).plugins
    const { options } = htmlWebpackPluginSetting
    expect(options).toHaveProperty('template', 'src/index.html')
    expect(options).toHaveProperty('minify', true)
  })

  test('should override default settings', () => {
    const [htmlWebpackPluginSetting] = config.useHtmlPlugin({
      minify: true,
      template: 'src/main.html'
    }).plugins
    const { options } = htmlWebpackPluginSetting
    expect(options).toHaveProperty('template', 'src/main.html')
    expect(options).toHaveProperty('minify', true)
  })
})
