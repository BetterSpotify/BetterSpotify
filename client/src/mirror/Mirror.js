import Filters from "./Filters";
import Util, { zlinkRequire } from "../util";
/**
 * A lot of this code is from JsSucks/BetterDiscordApp
 * BetterDiscordApp is licensed under MIT.
 * Thank you!
 */

export default class Mirror {
  static reactInternalInstance(node, top = true) {
    if (!node) {
      return false;
    }
    let reactInternalInstance = Object.keys(node).find((i) =>
      i.startsWith("__reactInternalInstance")
    );
    if (!reactInternalInstance) return false;
    return node[reactInternalInstance];
  }
  static getComponent(node) {
    return this.getComponents(node)[0];
  }
  static getComponents(node, top = true) {
    const instance = this.reactInternalInstance(node);
    const components = [];
    let lastInstance = instance;

    do {
      if (typeof lastInstance.return.type === "string") break;
      if (lastInstance.return.type) components.push(lastInstance.return.type);
      lastInstance = lastInstance.return;
    } while (lastInstance.return);

    return components;
  }

  static findComponent(selector, top = true) {
    let node = document.querySelector(selector);
    return this.getComponent(node);
  }

  static _intFindModule(...args) {
    let filters = args || [];
    let index = 0;
    let predicate = (item, idx) => {
      if (!item) return false;
      let lastArg = true;
      filters.forEach((filter) => {
        if (!lastArg) return;
        lastArg = filter(item);
      });
      if (lastArg) {
        index = idx;
      }
      return lastArg;
    };
    let mod = Util.zlinkModules.find(predicate);
    return {
      index: index,
      moduleSource: mod,
      module: Util.zlinkRequire(index),
    };
  }
  static getStore() {
    return this.findModule(
      Filters.Exists(),
      Filters.Has.String("window.__REDUX_DEVTOOLS_EXTENSION__")
    ).default;
  }
  static findModule(...args) {
    return this._intFindModule(...args).module;
  }
  /**
   * Wait for a selector to appear in the DOM (with timeout defaulting to 1000ms)
   * @param {string} selector - CSS selector (document.querySelector)
   * @param {number} [timeout=1000] - Timeout in milliseconds
   */
  static waitForSelector(selector, timeout) {
    return new Promise((resolve, reject) => {
      let breakOut = false;
      setTimeout(() => {
        breakOut = true;
        reject(false);
      }, timeout);
      while (!breakOut && document.querySelector(selector) === null) {}
      if (!breakOut) {
        return resolve(document.querySelector(selector));
      }
    });
  }
}
window.Mirror = Mirror;
window.Filters = Filters;
