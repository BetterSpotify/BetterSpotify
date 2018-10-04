import Util from "../util";

const ws = new WebSocket("ws://localhost:8162");
ws.onopen = () => console.log("CustomSpotify websocket opened");
ws.onclose = () => console.log("CustomSpotify websocket closed");
ws.onmessage = msg => {
  try {
    let data = JSON.parse(msg.data);
    let payload = data.payload;
    switch (data.event) {
      case "RENDER":
        Util.injectStyles(payload);
        break;
      default:
        console.warn("Unknown WebSocket event");
    }
  } catch (err) {
    console.error("Failed to parse WebSocket message data", err);
  }
};
