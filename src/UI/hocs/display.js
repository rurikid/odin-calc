import { Constants } from "../../constants.js";
import { DigitArray } from "../components/digitArray.js";
import { DisplayAlign } from "../../enums/displayAlign.js";

class Display {
  node;
  input;
  results;

  constructor() {
    this.node = document.createElement('div');
    this.node.id = 'display';
    this.node.className = 'flex-column display';

    this.input = new DigitArray('input', Constants.DigitCount, new DisplayAlign(DisplayAlign.Left));
    this.results = new DigitArray('results', Constants.DigitCount, new DisplayAlign(DisplayAlign.Right));

    this.node.appendChild(this.input.node);
    this.node.appendChild(this.results.node);
  }
}

export { Display };