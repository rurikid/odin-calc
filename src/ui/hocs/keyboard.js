import { Key } from "../components/key.js"

class Keyboard {
  static getKeyboard(keys) {
    let keyboard = document.createElement("div");
    keyboard.className = "flex-row flex-center keyboard";
    let btns = keys.map(x => Key.getKey(x));
    btns.forEach(btn => keyboard.appendChild(btn));
    return keyboard;
  }
}

export { Keyboard };
