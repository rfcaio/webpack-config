# webpack-config [![Build Status](https://travis-ci.org/rfcaio/webpack-config.svg?branch=master)](https://travis-ci.org/rfcaio/webpack-config) [![Coverage Status](https://coveralls.io/repos/github/rfcaio/webpack-config/badge.svg?branch=master)](https://coveralls.io/github/rfcaio/webpack-config?branch=master)

> A webpack configuration generator for my projects.

## Install

```
$ npm install --save-dev @rfcaio/webpack-config
```

## Usage

Install `webpack` and the rest of dependencies.

```
$ npm install --save-dev webpack webpack-cli webpack-dev-server
```

Install `webpack-merge` to manage configuration parts.

```
$ npm install --save-dev webpack-merge
```

Create a `webpack` configuration file.

```js
// webpack.prod.js
const merge = require('webpack-merge')
const config = require('@rfcaio/webpack-config')

module.exports = merge([
  config.extractCSS(),
  config.useHtmlPlugin(),
  {
    mode: 'production'
  }
])
```

Use configuration via `webpack`.

```
$ npx webpack --config webpack.prod.js
```

## API

**devServer**

Generates a configuration for `webpack-dev-server`.

```js
config.devServer()
/*
{
  stats: 'errors-only'
}
*/

config.devServer({ port: 1337, stats: 'verbose' })
/*
{
  port: 1337,
  stats: 'verbose'
}
*/
```

**extractCSS**

Generates a configuration to extract CSS files. Useful for production builds.

```js
config.extractCSS()
/*
{
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
}
*/
```

**loadCSS**

Generates a configuration to load CSS files.

```js
config.loadCSS()
/*
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

**useErrorOverlayPlugin**

Generates a configuration for `error-overlay-webpack-plugin`.

```js
config.useHtmlPlugin()
/*
{
  plugins: [new ErrorOverlayWebpackPlugin()]
}
*/
```

**useHtmlPlugin**

Generates a configuration for `html-webpack-plugin`.

```js
config.useHtmlPlugin()
/*
{
  template: 'src/index.html'
}
*/

config.useHtmlPlugin({ minify: true, template: 'src/main.html' })
/*
{
  minify: true,
  template: 'src/main.html'
}
*/
```
