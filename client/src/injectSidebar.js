import { Mirror, Classes, Elements } from "./mirror";
import ReactDOM from "react-dom";
import Sidebar from "./components/Sidebar.jsx";
import Util from "./util";

import $ from "jquery";

export default async () => {
  if (!Util.inFrame) {
    $(document).ready(async () => {
      let firstSidebarList = await Mirror.waitForSelector(
        `.${Classes.Sidebar.LeftSidebar} > .${
          Classes.Sidebar.LeftSidebar__section
        }:first-child`
      );
      let sidebarContainer = document.createElement("div");
      sidebarContainer.className = Classes.Sidebar.LeftSidebar__section;
      let sidebar = (
        <Sidebar title="CustomSpotify">
          <Sidebar.Item
            title="Settings"
            url="spotify:app:customspotify_settings"
          />
        </Sidebar>
      );
      ReactDOM.render(sidebar, sidebarContainer);
      $(sidebarContainer).insertAfter(firstSidebarList);
    });
  }
};
