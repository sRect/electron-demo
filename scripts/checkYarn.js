// https://github.com/vuejs/vue-next/blob/master/scripts/checkYarn.js
if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
  console.warn('\u001b[33m请使用yarn进行安装依赖\u001b[39m\n');
  process.exit(1);
}
