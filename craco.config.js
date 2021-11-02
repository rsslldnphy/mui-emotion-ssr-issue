module.exports = {
  babel: {
    presets: ["@emotion/babel-preset-css-prop"],
    plugins: ["babel-plugin-lodash"],
  },
  devServer: {
    writeToDisk: true,
  },
};
