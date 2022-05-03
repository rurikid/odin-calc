'use strict';

import { Key } from "../components/key.js"

class Keyboard {
  static getKeyboard(keys) {
    let keyboard = document.createElement("div");
    keyboard.className = "flex-row flex-center keyboard";
    keyboard.innerHTML = keys.map(x => Key.getKey(x)).join('');
    return keyboard;
  }
}

export { Keyboard };