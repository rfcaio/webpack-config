const parts = require('.')

describe('devServer', () => {
  test('should return a default setting when no parameters are passed', () => {
    expect(parts.devServer()).toEqual({
      devServer: {
        stats: 'errors-only'
      }
    })
  })

  test('should return a setting merged with the options object passed as parameter', () => {
    const options = {
      historyApiFallback: true,
      port: 1337
    }
    expect(parts.devServer(options)).toEqual({
      devServer: {
        historyApiFallback: true,
        port: 1337,
        stats: 'errors-only'
      }
    })
  })

  test('should override default setting', () => {
    const options = {
      port: 1337,
      stats: 'verbose'
    }
    expect(parts.devServer(options)).toEqual({
      devServer: {
        port: 1337,
        stats: 'verbose'
      }
    })
  })
})
