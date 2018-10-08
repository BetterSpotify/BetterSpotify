import { Mirror, Classes, Elements } from "./mirror";
import ReactDOM from "react-dom";
import Sidebar from "./components/Sidebar.jsx";
import Util from "./util";
import insertAfter from "./insertAfter";

export default async () => {
  if (!Util.inFrame) {
    document.addEventListener("readystatechange", async e => {
      if (document.readyState !== "complete") return;
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
      insertAfter(sidebarContainer, firstSidebarList);
    });
  }
};
