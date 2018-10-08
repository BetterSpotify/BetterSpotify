import Util from "./util";
import Registrar from "./Registrar";
import { Mirror } from "./mirror";
export default async () => {
  if (Util.inFrame) return;
  let observer = new MutationObserver(mutations => {
    mutations.forEach(async mutation => {
      if (mutation.type !== "attributes") return;
      const store = Mirror.getStore();
      let lastRequestedPageUri = store.getState().pages.lastRequestedPageUri;
      if (!Registrar.pageOverwriteExists(lastRequestedPageUri)) return;
      let ele = await Mirror.waitForSelector(
        `iframe[src="${lastRequestedPageUri}"]`
      );
      ele.classList.remove("active");
    });
  });
  observer.observe(
    await Mirror.waitForSelector(".main-view.flex-1.flex-col-container"),
    {
      subtree: true,
      attributeFilter: ["class"],
      attributes: true
    }
  );
};
