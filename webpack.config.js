const { merge } = require('webpack-merge');
const baseConf = require('./webpack/webpack.base');
const mainDevConf = require('./webpack/webpack.main.dev');
const renderDevConf = require('./webpack/webpack.render.dev');
const mainProdConf = require('./webpack/webpack.main.prod');
const renderProdConf = require('./webpack/webpack.render.prod');

const isProd = process.env.NODE_ENV === 'production';

module.exports = () =>
  process.env.START_ENV === 'main'
    ? merge(baseConf, isProd ? mainProdConf : mainDevConf)
    : merge(baseConf, isProd ? renderProdConf : renderDevConf);
