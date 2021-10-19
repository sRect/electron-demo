const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  entry: path.resolve(rootDir, 'app/renderer/index.tsx'),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].[fullhash:8].js',
    clean: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader', 'postcss-loader'],
      // },
      {
        test: /\.(le|c)ss/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // 解决 css 命名混乱和冲突
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5 + electron demo',
      filename: 'index.html',
      template: path.resolve(rootDir, 'app/renderer/index.html'),
    }),
  ],
  devServer: {
    // contentBase: path.resolve(rootDir, "dist"),
    static: {
      directory: path.resolve(rootDir, 'dist'),
      publicPath: '/',
      serveIndex: true,
    },
    port: 7001,
    host: '127.0.0.1', // 要指定ip，不能直接通过localhost启动，不指定会报错
    compress: true,
    // open: true,
    hot: true,
    historyApiFallback: true,
    // stats: 'errors-only', // 终端仅打印 error
    // proxy: {}
  },
};
