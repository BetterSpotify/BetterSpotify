import Util from "./util";

export default async () => {
  if (Util.inDev) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "http://localhost:8161/stylesheet.css";
    document.getElementsByTagName("head")[0].appendChild(link);
    Util.lastInjectedStyle = link;
  } else {
    Util.injectStyles(__BUILDTIME_STYLES__);
  }
};
