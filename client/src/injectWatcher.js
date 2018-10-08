import Watcher from "./components/Watcher.jsx";
import { Mirror } from "./mirror";
import Util from "./util";
import insertAfter from './insertAfter';
export default async () => {
  if (!Util.inFrame) {
    document.addEventListener("readystatechange", e => {
      if (document.readyState !== "complete") return;
      let insertionPoint = await Mirror.waitForSelector(
        `#view-content > a#content-anchor`
      );
      let watcherContainer = document.createElement("div");
      watcherContainer.style =
        "height: 100%; position: absolute; top: 0; width: 100%;";
      ReactDOM.render(<Watcher />, watcherContainer);
      insertAfter(watcherContainer, insertionPoint);
    });
  }
};
