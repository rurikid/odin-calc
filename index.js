import { Constants } from "./src/constants.js";
import { Keyboard } from "./src/ui/hocs/keyboard.js";
import { DigitArray } from "./src/ui/components/digitArray.js";
import { DisplayAlign } from "./src/enums/displayAlign.js";

let canvas = document.getElementById("canvas");
canvas.appendChild(Keyboard.getKeyboard(Constants.Keys));

let digitArray = new DigitArray("input", Constants.DigitCount, new DisplayAlign(DisplayAlign.Left));
// document.getElementById('display').appendChild(digitArray.node);

// digitArray.setDigit(Constants.Keys[6], 6);
// digitArray.setDigit(Constants.Keys[7], 8);
// digitArray.setDigit(Constants.Keys[8], 0);
// // digitArray.toggleDigit(0);
// digitArray.toggleDigit(8);
// digitArray.toggleDigit(8);

digitArray.setDisplay("ABCDØFGHIJ1MN");
digitArray.addDecimal();
