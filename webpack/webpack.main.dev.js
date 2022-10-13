const path = require('path');

const rootDir = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  // 编译为 Electron 主进程
  // https://webpack.docschina.org/configuration/target/
  target: 'electron-main',
  entry: path.resolve(rootDir, 'app/main/electron.ts'),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'electron.js',
    // webpack5.20.0+已经不需要使用clean-webpack-plugin了，output.clean可以清除输出目录
    clean: true,
  },
};
