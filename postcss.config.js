const tailwindcss = require("tailwindcss");

// https://www.npmjs.com/package/postcss-loader
module.exports = {
  plugins: [
		tailwindcss("./tailwind.config.js"),
		require('autoprefixer')
	],
};
