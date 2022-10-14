const webpack = require('webpack');
const conf = require('./webpack.main.dev');

module.exports = {
  ...conf,
  mode: 'production',
  output: {
    ...conf.output,
    clean: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      __dirname: '__dirname',
    }),
  ],
};
