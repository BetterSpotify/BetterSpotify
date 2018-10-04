import Util from "./util";
import { Mirror, Components } from "./mirror/index";
require("./init")();
if (Util.inDev) {
  require("./development");
}

function registerObserver() {
  let observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(addedNode => {
        if (addedNode.nodeName === "IFRAME") {
          addedNode.onload = () => {
            const script = document.createElement("script");
            script.innerHTML = Util.me;
            if (!Util.inFrame) {
              const loaded = () => {
                addedNode.contentWindow.postMessage(
                  JSON.stringify({
                    event: "ME",
                    payload: Util.me
                  }),
                  "*"
                );
              };
              script.onload = loaded;
              setTimeout(loaded, 500);
            }

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
}

if (Util.inFrame) {
  window.addEventListener("message", e => {
    try {
      let data = JSON.parse(e.data);
      if (data.event === "ME") {
        console.log("Got me event");
        Util.me = data.payload;
        registerObserver();
      }
    } catch (err) {}
  });
} else {
  if (Util.me === "") {
    let url = "https://zlink.app.spotify.com/injector.js";
    if (Util.inDev) url = "http://localhost:8161/injector.js";
    fetch(url)
      .then(res => res.text())
      .then(js => {
        Util.me = js;
        registerObserver();
      });
  }
}
