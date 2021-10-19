const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const chalk = require('chalk');
const rootDir = process.cwd();

module.exports = {
  stats: 'errors-warnings', // https://webpack.docschina.org/configuration/stats/
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],
    alias: {
      '@': path.resolve(rootDir, 'app/renderer'),
    },
  },
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(rootDir, 'app/renderer/static'), // 要打包的静态资源目录地址
          to: path.resolve(rootDir, 'dist/static'),
        },
      ],
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false,
    }), // 优化进度显示
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: 'My Project Webpack Build',
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true,
    }),
  ],
};
