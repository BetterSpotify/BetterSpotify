const Util = require("./util");

module.exports = () => {
  /*let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "http://localhost:8161/stylesheet.css";
  document.getElementsByTagName("head")[0].appendChild(link);
  Util.lastInjectedStyle = link;*/
  Util.injectStyles(__BUILDTIME_STYLES__);
};
