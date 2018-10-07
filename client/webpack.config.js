const webpack = require("webpack"),
  path = require("path"),
  fs = require("fs");
const DIST_DIRECTORY = path.resolve(__dirname, "..", "dist");
const STYLE_PATH = path.join(DIST_DIRECTORY, "stylesheet.css");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  },
  output: {
    path: DIST_DIRECTORY,
    filename: "injector.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      __BUILDTIME_STYLES__: `\`${fs.readFileSync(STYLE_PATH, "utf8")}\``
    })
  ],
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 1000000
  }
  //entry: ["@babel/polyfill", "./src/index.js"]
};
