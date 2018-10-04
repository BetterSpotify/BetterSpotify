const Util = {};

Util.lastInjectedStyle = null;

Util.injectStyles = styles => {
  if (Util.lastInjectedStyle) Util.lastInjectedStyle.remove();
  let el = document.createElement("style");
  el.innerHTML = styles;
  document.getElementsByTagName("head")[0].appendChild(el);
  Util.lastInjectedStyle = el;
  return el;
};

Util.inFrame = self !== top;

Util.topFrame = top;

Util.zlinkRequire = top.zlink_require;
Util.zlinkModules = top.zlink_modules;

Util.me = "";

module.exports = Util;
