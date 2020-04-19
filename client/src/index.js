import Util from "./util";
import Registrar from "./Registrar";
import registerFrameObserver from "./registerFrameObserver";
import registerObserver from "./registerObserver";
import injectSidebar from "./injectSidebar";
import injectWatcher from "./injectWatcher";
import initScript from "./init";
import Settings from "./pages/Settings.jsx";
initScript();
registerObserver();
registerFrameObserver();
injectSidebar(); // Don't await this! this hangs the main thread.
injectWatcher();
//Registrar.registerPageOverwrite("spotify:app:customspotify_settings", Settings);
if (Util.inDev) {
  require("./development");
}
if (Util.inFrame) {
  window.addEventListener("message", (e) => {
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
      .then((res) => res.text())
      .then((js) => {
        Util.me = js;
        registerObserver();
      });
  }
}
