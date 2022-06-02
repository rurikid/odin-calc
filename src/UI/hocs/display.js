import { Constants } from "../../constants.js";
import { DigitArray } from "../components/digitArray.js";
import { DisplayAlign } from "../../enums/displayAlign.js";
import { ExpressionTokenizer, ExpressionErrors } from "../../utilities/expressionTokenizer.js";

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
  // TODO: cursor stops after enter
  // TODO: after enter, basic operators prepend Lastx
  // TODO: output should be right aligned on result; left aligned on error
  // TODO: Overflow should flash before returning to previous state
  // TODO: e notation should always append with decimal
  // TODO: 
  keystrokeHandler(key) {
    switch(key.id) {
      case 'enterBtn':
        try {
          if (this.input.input === '') { this.output.setResult('0'); return; };

          let result = ExpressionTokenizer.evaluate(ExpressionTokenizer.GetTokens(this.input.input)).value;

          if (!isFinite(result)) throw ExpressionErrors.overflow;

          let resultSplit = result.toString().split('e');
          if (resultSplit.length > 1) {
            resultSplit[1] = parseInt(resultSplit[1]) > 0 ? // only negative shows sign
              resultSplit[1].slice(1) : resultSplit[1];
          }

          if (result.toString().length > Constants.DigitCount) {
            let hasDecimal = result.toString().split('.').length > 1;

            result = `${resultSplit[0]
              .slice(0, Constants.DigitCount - resultSplit[0].length - resultSplit[1].toString().length - (hasDecimal ? 0 : 1))}e${resultSplit[1]}`;
          } else if (resultSplit.length > 1) {
            result = resultSplit[0] + '.e' + resultSplit[1];
          }

          result = result.toString().replace('-', '_'); // necessary for characterBit conversion
          this.output.setResult(result.toString());
        } catch (error) {
          this.output.setDisplay(error);
          if (error.length >= Constants.DigitCount - 2) { this.output.errorShift(); }
        }
        break;
      case 'backspace':
        this.input.backspace();
        break;
      case 'clear':
        this.input.clear();
        this.output.clear();
        break;
      case 'leftArrow':
        this.output.clear();
        this.input.decrementCursor();
        break;
      case 'rightArrow':
        this.output.clear();
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