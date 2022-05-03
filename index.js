import { Constants } from "./src/constants.js";
import { Keyboard } from "./src/ui/hocs/keyboard.js";

let canvas = document.getElementById("canvas");
canvas.appendChild(Keyboard.getKeyboard(Constants.Keys));
