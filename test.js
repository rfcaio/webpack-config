const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('.')

jest.mock('error-overlay-webpack-plugin')
jest.mock('html-webpack-plugin')
jest.mock('mini-css-extract-plugin')

describe('devServer', () => {
  test('return default settings when no options are passed', () => {
    expect(config.devServer()).toEqual({
      devServer: {
        stats: 'errors-only'
      }
    })
  })

  test('merge options with default settings', () => {
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

  test('override default settings', () => {
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
  test('return default settings when no options are passed', () => {
    const {
      module: { rules }
    } = config.extractCSS()
    expect(rules).toEqual([
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ])
    expect(MiniCssExtractPlugin).toHaveBeenCalledWith({
      filename: '[name].css'
    })
  })
})

describe('loadCSS', () => {
  test('return default settings when no options are passed', () => {
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

describe('useErrorOverlayPlugin', () => {
  test('return default settings', () => {
    config.useErrorOverlayPlugin()
    expect(ErrorOverlayWebpackPlugin).toHaveBeenCalled()
  })
})

describe('useHtmlPlugin', () => {
  test('return default settings when no options are passed', () => {
    config.useHtmlPlugin()
    expect(HtmlWebpackPlugin).toHaveBeenCalledWith({
      template: 'src/index.html'
    })
  })

  test('merge options with default settings', () => {
    config.useHtmlPlugin({ minify: true })
    expect(HtmlWebpackPlugin).toHaveBeenCalledWith({
      minify: true,
      template: 'src/index.html'
    })
  })

  test('override default settings', () => {
    config.useHtmlPlugin({ minify: true, template: 'src/main.html' })
    expect(HtmlWebpackPlugin).toHaveBeenCalledWith({
      minify: true,
      template: 'src/main.html'
    })
  })
})
