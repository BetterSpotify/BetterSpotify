(() => {
  let lastStyleElement;

  const injectStyles = css => {
    if (lastStyleElement) lastStyleElement.remove();
    let el = document.createElement("style");
    el.innerHTML = css;
    document.getElementsByTagName("head")[0].appendChild(el);
    lastStyleElement = el;
    return el;
  };

  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "http://localhost:8161/stylesheet.css";
  document.getElementsByTagName("head")[0].appendChild(link);
  lastStyleElement = link;

  const ws = new WebSocket("ws://localhost:8162");
  ws.onopen = () => console.log("CustomSpotify websocket opened");
  ws.onclose = () => console.log("CustomSpotify websocket closed");
  ws.onmessage = msg => {
    try {
      let data = JSON.parse(msg.data);
      let payload = data.payload;
      switch (data.event) {
        case "RENDER":
          injectStyles(payload);
          break;
        default:
          console.warn("Unknown WebSocket event");
      }
    } catch (err) {
      console.error("Failed to parse WebSocket message data", err);
    }
  };

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
})();
