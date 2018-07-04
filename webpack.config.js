const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: 'production',
  output: {
    library: 'A11yNavigation',
    libraryTarget: 'umd',
    libraryExport: 'A11yNavigation'
  },
  stats: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: process.env.WEBPACK_SERVE || false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: 'src/demo.html',
      inject: 'head'
    })
  ]
}

if (process.env.WEBPACK_SERVE) {
  config.mode = 'development'
  config.devtool = 'cheap-module-eval-source-map'

  config.serve = {
    dev: {
      logLevel: 'silent'
    },
    hot: {
      logLevel: 'silent'
    },
    logLevel: 'error'
  }

  config.plugins.push(new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: ['Project is running at http://localhost:8080/demo.html']
    }
  }))
} else {
  config.plugins.push(new FriendlyErrorsWebpackPlugin({
    clearConsole: false
  }))
}

module.exports = config
