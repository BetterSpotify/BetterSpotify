const sassWatcher = require("./watch-sass"),
  WebSocket = require("ws");

const wss = new WebSocket.Server({
  port: 8162
});
sassWatcher.on("rendered", css => {
  wss.clients.forEach(client => {
    client.send(
      JSON.stringify({
        event: "RENDER",
        payload: css.toString()
      })
    );
  });
});
