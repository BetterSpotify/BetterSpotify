import Util from "./util";

export default async () => {
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
};
