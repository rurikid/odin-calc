import { Constants } from "./src/constants.js";
import { Keyboard } from "./src/ui/hocs/keyboard.js";
import { DigitArray } from "./src/ui/components/digitArray.js";
import { DisplayAlign } from "./src/enums/displayAlign.js";
import { Display } from "./src/ui/hocs/display.js";

let canvas = document.getElementById("canvas");
let display = new Display();
canvas.appendChild(display.node);
canvas.appendChild(Keyboard.getKeyboard(Constants.Keys));

display.input.setDisplay("HELLO");
display.results.setDisplay("HELLO");