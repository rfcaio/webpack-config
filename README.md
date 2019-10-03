# webpack-config [![Build Status](https://travis-ci.org/rfcaio/webpack-config.svg?branch=master)](https://travis-ci.org/rfcaio/webpack-config) [![Coverage Status](https://coveralls.io/repos/github/rfcaio/webpack-config/badge.svg?branch=master)](https://coveralls.io/github/rfcaio/webpack-config?branch=master)

> A webpack configuration generator for my projects.

## Install

```
$ npm install --save @rfcaio/webpack-config
```

## Usage

```js
const config = require('@rfcaio/webpack-config')
```

## API

**devServer**

Generates a configuration for `webpack-dev-server`.

```js
config.devServer() // { stats: 'errors-only' }

config.devServer({ port: 1337, stats: 'verbose' }) // { port: 1337, stats: 'verbose' }
```
