import Settings from "./pages/Settings.jsx";
const DEFAULT_OVERWRITES = {
  "spotify:app:customspotify_settings": {
    id: "customspotify_settings",
    component: Settings
  }
};

const DEFAULT_SIDEBAR_ITEMS = {
  "spotify:app:customspotify_settings": {
    title: "Settings",
    url: "spotify:app:customspotify_settings"
  }
};

export default class Registar {
  static pageOverwrites = {};
  static registerPageOverwrite(page, component) {
    let id = page.split(":")[2];
    this.pageOverwrites[page] = {
      id,
      component
    };
    return this;
  }
  static getPageOverwrite(page) {
    if (DEFAULT_OVERWRITES[page]) return DEFAULT_OVERWRITES[page];
    return this.pageOverwrites[page];
  }
  static pageOverwriteExists(page) {
    if (typeof DEFAULT_OVERWRITES[page] !== "undefined") return true;
    return typeof this.pageOverwrites[page] !== "undefined";
  }

  static sidebarItems = [];
  static defaultSidebarItems = DEFAULT_SIDEBAR_ITEMS;
  static registerSidebarItem(title, url) {
    this.sidebarItems.push({
      title,
      url
    });
    return this;
  }
  static getSidebarItem(url) {
    if (DEFAULT_SIDEBAR_ITEMS[url]) return DEFAULT_SIDEBAR_ITEMS[url];
    return this.sidebarItems.find(item => item.url === url);
  }
  static sidebarItemExists(url) {
    if (typeof DEFAULT_SIDEBAR_ITEMS[url] !== "undefined") return true;
    return typeof this.getSidebarItem(url) !== "undefined";
  }
}
