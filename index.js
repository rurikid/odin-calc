import { Keyboard } from "./src/ui/hocs/keyboard.js";
import { Controls } from "./src/controls.js"; 
import { Display } from "./src/ui/hocs/display.js";

let canvas = document.getElementById("canvas");
let display = new Display();
canvas.appendChild(display.node);
let controls = new Controls(display);
canvas.appendChild(Keyboard.getKeyboard(controls.Keys));

display.input.setDisplay("HELLO");
display.results.setDisplay("HELLO");

controls.Keys[0].onclick();
controls.Keys[0].onclick();