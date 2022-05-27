import { Constants } from "../../constants.js";
import { DigitArray } from "../components/digitArray.js";
import { DisplayAlign } from "../../enums/displayAlign.js";

class Display {
  node;
  input;
  output;

  constructor() {
    this.node = document.createElement('div');
    this.node.id = 'display';
    this.node.className = 'flex-column display';

    this.input = new DigitArray('input', Constants.DigitCount, new DisplayAlign(DisplayAlign.Left));
    this.output = new DigitArray('results', Constants.DigitCount, new DisplayAlign(DisplayAlign.Right));

    this.node.appendChild(this.input.node);
    this.node.appendChild(this.output.node);
  }

  calculate() {

  }

  keystrokeHandler(key) {
    switch(key.id) {
      case 'enterBtn':
        let result = this.calculate();
        this.output.setDisplay(this.input.input);
        break;
      case 'backspace':
        this.input.backspace();
        break;
      case 'clear':
        this.input.clear();
        this.output.clear();
        break;
      case 'leftArrow':
        this.input.decrementCursor();
        break;
      case 'rightArrow':
        this.input.incrementCursor();
        break;
      case 'plusMinus':
        this.input.insertSign();
        break;
      case 'decimal':
        this.input.insertDecimal();
        break;
      default:
        this.input.insert(key.input, key.inputOffset);
    }
  }
}

export { Display };