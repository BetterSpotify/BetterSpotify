import { Mirror, Classes, Elements } from "./mirror";
import ReactDOM from "react-dom";
import Sidebar from "./components/Sidebar.jsx";
import Util from "./util";
import insertAfter from "./insertAfter";
import Registrar from "./Registrar";

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
          {Object.keys(Registrar.defaultSidebarItems).map(key => {
            let item = Registrar.defaultSidebarItems[key];
            return <Sidebar.Item key={key} title={item.title} url={item.url} />;
          })}
          {Registrar.sidebarItems.map(item => (
            <Sidebar.Item
              key={`${item.url}${item.title}`}
              title={item.title}
              url={item.url}
            />
          ))}
        </Sidebar>
      );
      ReactDOM.render(sidebar, sidebarContainer);
      insertAfter(sidebarContainer, firstSidebarList);
    });
  }
};
