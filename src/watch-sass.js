const chokidar = require("chokidar"),
  path = require("path"),
  sass = require("node-sass"),
  fs = require("fs");
const EventEmitter = require("eventemitter3");

class SassWatcher extends EventEmitter {
  constructor() {
    super();
    this.SASS_DIRECTORY = path.resolve(__dirname, "sass");
    this.DIST_DIRECTORY = path.resolve(__dirname, "..", "dist");
    this.STYLE_PATH = path.join(this.DIST_DIRECTORY, "stylesheet.css");

    this.watcher = chokidar.watch(this.SASS_DIRECTORY);
    this.watcher.on("change", (e, file) => this.render());
    this.watcher.on("unlink", (e, file) => this.render());
  }

  render() {
    sass.render(
      {
        file: path.join(this.SASS_DIRECTORY, "main.scss"),
        includePaths: [this.SASS_DIRECTORY],
        outputStyle: "compressed",
        outFile: this.STYLE_PATH
      },
      (err, res) => {
        if (err) {
          console.error("Error while rendering SASS");
          console.error(err.message);
          console.error("Status:", err.status);
          console.error("Column:", err.column);
          console.error(err.line);
          return;
        }
        fs.writeFile(this.STYLE_PATH, res.css, err => {
          if (err) {
            console.error("Failed to write CSS to disk");
            console.error(err);
            return;
          }
          console.log("Rendered SASS successfully");
          this.emit("rendered", res.css);
        });
      }
    );
  }
}
module.exports = new SassWatcher();
