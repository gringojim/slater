const webpack = require('webpack')
const path = require('path')

// See https://webpack.js.org/guides/hmr-react/

const config = module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/js/index'
    ]
  },
  output: {

    filename: 'build/app.js',
    path: __dirname,
    //    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
      {
        test: /\.s?css$/,
        use: [{ loader: 'style-loader' },
        {
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            sourceMap: true
          }
        },
        { loader: 'postcss-loader' },
        { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: process.env.NODE_ENV === 'production',
      debug: process.env.NODE_ENV !== 'production',
      options: {
        postcss: [
          require('autoprefixer')
        ]
      }
    })
  ]
}

if ('production' === process.env.NODE_ENV) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  config.devtool = 'inline-source-map';
}
