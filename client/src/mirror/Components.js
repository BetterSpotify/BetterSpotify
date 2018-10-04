import Mirror from "./Mirror";
const components = {};
try {
  components.SidebarListItem = Mirror.findComponent(".SidebarListItem");
} catch (err) {}

export default components;
