import { Constants } from "./src/constants.js";
import { Keyboard } from "./src/ui/hocs/keyboard.js";
import { DigitArray } from "./src/ui/components/digitArray.js";


let canvas = document.getElementById("canvas");
canvas.appendChild(Keyboard.getKeyboard(Constants.Keys));

let digitArray = new DigitArray("input", Constants.DigitCount);
document.getElementById('display').appendChild(digitArray.node);

console.log(Constants.Keys[6]);
digitArray.update(Constants.Keys[6], 6);
