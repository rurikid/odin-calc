import { Keyboard } from "./src/ui/hocs/keyboard.js";
import { Controls } from "./src/controls.js"; 
import { Display } from "./src/ui/hocs/display.js";
import { ExpressionTokenizer } from "./src/utilities/ExpressionTokenizer.js";

let canvas = document.getElementById("canvas");
let display = new Display();
canvas.appendChild(display.node);
let controls = new Controls(display);
canvas.appendChild(Keyboard.getKeyboard(controls.Keys));

display.input.setDisplay("_2.16*SIN(42)+(64÷3*COS(42))-16^3-INV(32-TAN(64+(_1.42*_8.64)))");
ExpressionTokenizer.GetTokens(display.input.input);