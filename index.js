import { Keyboard } from "./src/ui/hocs/keyboard.js";
import { Controls } from "./src/controls.js"; 
import { Display } from "./src/ui/hocs/display.js";
import { VSHeader } from "./src/vs-common/vs-header.js";

document.getElementById("header").appendChild(VSHeader.render());

let canvas = document.getElementById("canvas");
let display = new Display();
canvas.appendChild(display.node);
let controls = new Controls(display);
canvas.appendChild(Keyboard.getKeyboard(controls.Keys));

display.input.setDisplay("_100.1^100");