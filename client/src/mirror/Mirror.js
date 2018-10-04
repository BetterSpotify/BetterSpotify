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
    let reactInternalInstance = Object.keys(node).find(i =>
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
      let lastArg = true;
      filters.forEach(filter => {
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
      module: Util.zlinkRequire(index)
    };
  }

  static findModule(...args) {
    return this._intFindModule(...args).module;
  }
}
window.CSMirror = Mirror;
