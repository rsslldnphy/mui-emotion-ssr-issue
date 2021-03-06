const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server/index.tsx",

  target: "node",

  externals: [nodeExternals()],

  output: {
    path: path.resolve(`build/server`),
    filename: "index.js",
  },

  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /(\.tsx?|\.jsx?)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
              "@emotion/babel-preset-css-prop",
            ],
            plugins: [
              "babel-plugin-lodash",
              "@babel/plugin-proposal-optional-chaining",
              "macros",
            ],
          },
        },
      },
    ],
  },
};
