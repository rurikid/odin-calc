import { Constants } from "../../constants.js";
import { DigitArray } from "../components/digitArray.js";
import { DisplayAlign } from "../../enums/displayAlign.js";
import { ExpressionTokenizer } from "../../utilities/ExpressionTokenizer.js";

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

  // TODO: left after enter needs to scroll through previous expression start at last index
  // TODO: right after enter needs to scroll through previous expression start at first index
  // TODO: issue with scrolling decimals
  // TODO: +/- toggle
  // TODO: one decimal per literal
  // TODO: 0 should prepend decimal if literal does not preceed cursor
  keystrokeHandler(key) {
    switch(key.id) {
      case 'enterBtn':
        let result = ExpressionTokenizer.evaluate(ExpressionTokenizer.GetTokens(this.input.input)).value;
        result = result.toString();
        this.output.setDisplay(result);
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