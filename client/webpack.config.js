const webpack = require("webpack"),
  path = require("path"),
  fs = require("fs");
const DIST_DIRECTORY = path.resolve(__dirname, "..", "dist");
const STYLE_PATH = path.join(DIST_DIRECTORY, "stylesheet.css");

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
  },
  plugins: [
    new webpack.DefinePlugin({
      __BUILDTIME_STYLES__: `\`${fs.readFileSync(STYLE_PATH, "utf8")}\``
    })
  ]
};
