const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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

describe('extractCSS', () => {
  test('should return default settings to extract CSS files when no options are passed', () => {
    expect(config.extractCSS()).toMatchObject({
      module: { rules: expect.any(Array) },
      plugins: expect.any(Array)
    })
    expect(config.extractCSS().module.rules).toEqual([
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ])
    const [miniCssExtractPluginObject] = config.extractCSS().plugins
    expect(miniCssExtractPluginObject.options).toHaveProperty(
      'filename',
      '[name].css'
    )
  })
})

describe('loadCSS', () => {
  test('should return default settings to load CSS files when no options are passed', () => {
    expect(config.loadCSS()).toEqual({
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
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
