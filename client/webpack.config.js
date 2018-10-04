const webpack = require("webpack"),
  path = require("path");
const DIST_DIRECTORY = path.resolve(__dirname, "..", "dist");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  output: {
    path: DIST_DIRECTORY,
    filename: "injector.js"
  }
};
