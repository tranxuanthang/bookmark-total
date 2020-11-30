const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    popup: './src/popup.js',
    // main: './src/main.js',
    background: './src/background.js',
    // content: './src/content.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' },
      ],
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production'
  }
}
