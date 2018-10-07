import Watcher from "./components/Watcher.jsx";
import { Mirror } from "./mirror";
import Util from "./util";
import $ from "jquery";
export default async () => {
  if (!Util.inFrame) {
    $(document).ready(async () => {
      let insertionPoint = await Mirror.waitForSelector(
        `#view-content > a#content-anchor`
      );
      let watcherContainer = document.createElement("div");
      ReactDOM.render(<Watcher />, watcherContainer);
      $(watcherContainer).insertAfter(insertionPoint);
    });
  }
};
