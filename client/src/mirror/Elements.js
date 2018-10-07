import Mirror from "./Mirror";
import $ from "jquery";
let elements = {};

async function getElementBySelector(selector) {
  let element = await Mirror.waitForSelector(selector);
  return Mirror.reactInternalInstance(element);
}

export default getElementBySelector;
