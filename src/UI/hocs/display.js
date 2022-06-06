import { Constants } from "../../constants.js";
import { DigitArray } from "../components/digitArray.js";
import { DisplayAlign } from "../../enums/displayAlign.js";
import { ExpressionTokenizer, ExpressionErrors } from "../../utilities/expressionTokenizer.js";

class Display {
  node;
  input;
  output;
  hadError;
  lastInput;

  constructor() {
    this.node = document.createElement('div');
    this.node.id = 'display';
    this.node.className = 'flex-column display';
    this.error = '';
    this.lastInput = '';

    this.input = new DigitArray('input', Constants.DigitCount, new DisplayAlign(DisplayAlign.Left));
    this.output = new DigitArray('results', Constants.DigitCount, new DisplayAlign(DisplayAlign.Right));

    this.node.appendChild(this.input.node);
    this.node.appendChild(this.output.node);
  }

  // TODO: clicking sound?
  // TODO: keypad input
  // TODO: after enter, basic operators prepend Lastx
  // TODO: Fix period styling
  // TODO: fix . before e
  keystrokeHandler(key) {
    switch(key.id) {
      case 'enterBtn':
        try {
          // if error displayed
          if (this.hadError) {
            this.hadError = false;
            this.output.clear();
            this.input.setDisplay(this.lastInput);
            return;
          }

          this.input.removeCursor();
          if (this.input.input === '') { this.output.setResult('0'); return; };

          let result = ExpressionTokenizer.evaluate(ExpressionTokenizer.GetTokens(this.input.input)).value;

          this.output.setResult(this.formatResult(result));
          this.input.alignDisplay(DisplayAlign.Left);
          this.input.removeCursor();
        } catch (error) {
          this.hadError = true;
          this.lastInput = this.input.input;
          
          this.input.clear();
          this.input.removeCursor();

          this.output.setDisplay(error);
          
          if (error === ExpressionErrors.overflow) setTimeout(() => {
            this.input.setDisplay(lastInput);
            this.output.setResult(this.formatResult(Number.MAX_VALUE));
          }, 1000);
          
          this.output.alignDisplay(DisplayAlign.Left);
          this.output.removeCursor();
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
        if (this.output.input !== '') {
          this.input.alignDisplay(DisplayAlign.Right);
          this.output.clear();
        }
        this.input.decrementCursor();
        break;
      case 'rightArrow':
        if (this.output.input !== '') {
          this.input.alignDisplay(DisplayAlign.Left);
          this.output.clear();
          return;
        }
        this.input.incrementCursor();
        break;
      case 'plusMinus':
        this.input.insertSign();
        break;
      case 'decimal':
        this.input.insertDecimal();
        break;
      default:
        this.output.clear();
        this.input.insert(key.input, key.inputOffset);
    }
  }

  // expects float
  formatResult(result) {
    if (!isFinite(result)) throw ExpressionErrors.overflow;
    if (result.length < Constants.DigitCount) return result.replace('-', '_');

    let hasE = result.toString().split('e').length > 1;

    // convert long to e notation
    let absFloatResult = Math.abs(result);
    if (!hasE && absFloatResult > 0 && absFloatResult < 1) {
      let e = 0;
      while (absFloatResult < 1) {
        absFloatResult *= 10;
        e++;
      }
      result = (result > 0 ? 1 : -1) * absFloatResult + 'e' + e;
    } else if (!hasE && absFloatResult > 1) {
      let e = 0;
      while (absFloatResult > 10) {
        absFloatResult /= 10;
        e++;
      }
      result = ((result > 0 ? 1 : -1) * absFloatResult) + 'e+' + e;
    }
    
    // handle e notation
    let resultSplit = result.toString().split('e');
    if (resultSplit.length > 1) {
      resultSplit[1] = parseInt(resultSplit[1]) > 0 ? // only negative shows sign
        resultSplit[1].slice(1) : resultSplit[1];
    } else if (result.length > Constants.DigitCount){
      let exponent = 0;
      let resultString = result.toString();
      if (result > 1) {
        while (resultString.length > Constants.DigitCount - 1 - exponent.toString().length - 1) {
          console.log(result);
          result /= 10;
          resultString = resultString.slice(0, resultString.length);
          exponent++;
        }
      } else {

        while (resultString.length > Constants.DigitCount - 1 - exponent.toString().length - 1) {
          result *= 10;
          resultString = resultString.slice(0, resultString.length);
          exponent--;
        }
      }

      result = resultString + 'e' + exponent;
      return result.toString().replace('-', '_');
    }

    if (result.toString().length > Constants.DigitCount) {
      let hasDecimal = result.toString().split('.').length > 1;

      result = `${resultSplit[0]
        .slice(0, Constants.DigitCount - resultSplit[0].length - resultSplit[1].toString().length - (hasDecimal ? 0 : 1))}e${resultSplit[1]}`;
    } else if (resultSplit.length > 1 && resultSplit[0].split('.').length > 1) {
      result = resultSplit[0] + 'e' + resultSplit[1];
    } else if (resultSplit.length > 1) {
      result = resultSplit[0] + '.e' + resultSplit[1];
    }

    return result.toString().replace('-', '_'); // necessary for characterBit conversion
  }
}

export { Display };