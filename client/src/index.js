import Util from "./util";
import { Mirror, Components } from "./mirror/index";

require("./init")();
if (process.env.NODE_ENV === "development") {
  require("./development");
}

let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(addedNode => {
      if (addedNode.nodeName === "IFRAME") {
        addedNode.onload = () => {
          const script = addedNode.contentDocument.createElement("script");
          script.src = "http://localhost:8161/injector.js";
          addedNode.contentDocument
            .getElementsByTagName("head")[0]
            .appendChild(script);
          console.log("Injected self into new iframe");
        };
      }
    });
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
