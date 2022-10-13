const { merge } = require('webpack-merge');
const baseConf = require('./webpack/webpack.base');
const mainConf = require('./webpack/webpack.main.dev');
const renderConf = require('./webpack/webpack.render.dev');

module.exports = () =>
  process.env.START_ENV === 'main' ? merge(baseConf, mainConf) : merge(baseConf, renderConf);
