import { DisplayAlign } from "../../enums/displayAlign.js";
import { CellArray } from "./cellArray.js";
import { Errors } from "../../vs-common/vs-logger.js";
import { Utilities } from "../../utilities/utilities.js";

class DigitArray {
  node;
  digitCount;
  cellCount;
  input;
  inputIndex;
  cursorIndex;
  alignment;
  id;
  
  constructor(id, digitCount, displayAlign) {
    this.digitCount = digitCount;
    this.cellCount = digitCount * 2 - 2;
    this.input = '';
    this.inputIndex = 0;
    this.cursorIndex = 0;
    this.displayAlign = displayAlign;
    this.id = id;

    this.node = document.createElement("div");
    this.node.className = "flex-row digit-array";
    this.node.id = id;

    this.clear();
  }

  // removes the digit or decimal immediately preceding the cursor
  backspace() {
    if (this.inputIndex !== 0) {
      let referenceCell = this.node.childNodes[this.cursorIndex];

      // backspace on decimal should only remove decimal
      if (this.input[this.inputIndex - 1] === '.') {

        if (referenceCell !== this.node.firstChild) {
          referenceCell.previousSibling.replaceWith(CellArray.getDecimalArray(false));
        }

        this.input = this.input.slice(0, this.inputIndex - 1) + this.input.slice(this.inputIndex);
        this.inputIndex = Utilities.clamp(this.inputIndex - 1, 0, this.input.length);

        // when decimal is first digit off screen
        // remove decimal, reveal next digit
        if (this.cursorIndex == 0) {
          this.inputIndex = Utilities.clamp(this.inputIndex - 1, 0, this.input.length);
          this.shiftLeft();
          this.cursorIndex = this.cursorIndex + 2;
        }

        return;
      }

      this.input = this.input.slice(0, this.inputIndex - 1) + this.input.slice(this.inputIndex);
      this.inputIndex = Utilities.clamp(this.inputIndex - 1, 0, this.input.length);

      if (this.cursorIndex === 0) return;

      if (referenceCell !== this.node.firstChild) {
        referenceCell.previousSibling.remove();
        referenceCell.previousSibling.remove();
      }
  
      this.cursorIndex = Utilities.clamp(this.cursorIndex - 2, 0, this.cellCount);
  
      let inputOffset = this.inputIndex + ((this.cellCount - this.cursorIndex) / 2);
      if (this.input.length > inputOffset) {
        this.node.append(CellArray.getDecimalArray(this.input[inputOffset] == '.' ? true : false));
        if (inputOffset < this.input.length) {
          this.node.append(CellArray.getCellArray(this.input[inputOffset]));
        } else {
          this.node.append(CellArray.getEmptyArray());
        }
      } else {
        this.node.append(CellArray.getDecimalArray(false));
        this.node.append(CellArray.getEmptyArray());
      }
    }
  }

  // sets the display to digitString
  setDisplay(digits) {
    this.clear();
    this.insert(digits)
  }

  // appends {digit} at {index}
  insert(digits, cursorOffset = 0) {

    // needs to replace item at current index
    digits.split('').forEach(digit => {
      if (digit === '.') {
        this.insertDecimal();
        return;
      }

      // get reference node
      let referenceCell = this.node.childNodes[this.cursorIndex];

      // insert before reference node, cell + decimal
      referenceCell.before(CellArray.getCellArray(digit));
      referenceCell.before(CellArray.getDecimalArray(digit === '.' ? true : false));

      this.node.lastChild.remove();
      this.node.lastChild.remove();

      // update input
      this.input = this.input.slice(0, this.inputIndex) + digit + this.input.slice(this.inputIndex);

      // increment cursor
      this.incrementCursor();
    })

    // correct for cursor offset
    while (cursorOffset < 0) {
      this.decrementCursor();
      cursorOffset++;
    }
  }

  insertDecimal() {
    let referenceCell = this.node.childNodes[this.cursorIndex];

    // look back
    for (let i = this.inputIndex - 1; i >= 0; i--) {
      if (this.input[i] === '.') return;
      if (!Utilities.isLiteral(this.input[i])) {
        break;
      }
    }
    
    // look forward
    for (let i = this.inputIndex + 1; i < this.input.length; i++) {
      if (this.input[i] === '.') return;
      if (!Utilities.isLiteral(this.input[i])) {
        break;
      }
    }

    if (this.cursorIndex === 0 && this.inputIndex !== 0) {
      this.input = this.input.slice(0, this.inputIndex) + '.' + this.input.slice(this.inputIndex);
      this.inputIndex++;
      return;
    }

    if (!Utilities.isLiteral(this.input[this.inputIndex - 1])) {
      if (this.cursorIndex === 0) {
        this.node.firstChild.before(CellArray.getDecimalArray(true));
        this.node.firstChild.before(CellArray.getCellArray('0'));
      } else {
        referenceCell.before(CellArray.getCellArray('0'));
        referenceCell.before(CellArray.getDecimalArray(true));
      }
      this.input = this.input.slice(0, this.inputIndex) + '0.' + this.input.slice(this.inputIndex);
      this.inputIndex += 2;
      if (this.cursorIndex === this.cellCount) {
        this.node.firstChild.remove();
        this.node.firstChild.remove();
        return;
      }
      this.cursorIndex += 2;
      this.node.lastChild.remove();
      this.node.lastChild.remove();
    } else if (this.input[this.inputIndex - 1] === '_') {
      this.insert('0.');
    } else {
      referenceCell.previousSibling.replaceWith(CellArray.getDecimalArray(true));
      this.input = this.input.slice(0, this.inputIndex) + '.' + this.input.slice(this.inputIndex);
      this.inputIndex++;
    }
  }

  // inserts a digit at the given indices; hard insert, no additional logic
  insertAtIndex(digit, cursorIndex, inputIndex) {
    // if digitIndex would be off screen
    if (inputIndex < this.inputIndex - (this.cursorIndex / 2)) {

      if (digit === '.' && this.input[inputIndex] === '.') {
        this.input = this.input.slice(0, inputIndex) + this.input.slice(inputIndex + 1);
        this.inputIndex--;
        return;
      }
      this.input = this.input.slice(0, inputIndex) + digit + this.input.slice(inputIndex);
      this.inputIndex++;
      return;
    }

    if (digit === '.') {
      if (this.input[inputIndex] === '.') {
        this.node.childNodes[cursorIndex].previousSibling.replaceWith(CellArray.getDecimalArray(false));
        this.input = this.input.slice(0, inputIndex - 1) + this.input.slice(inputIndex);
        this.inputIndex = inputIndex <= this.inputIndex ? this.inputIndex - 1 : this.inputIndex;
        return;
      } else {
        this.input = this.input.slice(0, inputIndex) + digit + this.input.slice(inputIndex);
        this.node.childNodes[cursorIndex].previousSibling.replaceWith(CellArray.getDecimalArray(true));
        this.inputIndex = inputIndex <= this.inputIndex ? this.inputIndex + 1 : this.inputIndex;
        return;
      }
    }

    this.node.lastChild.remove();
    this.node.lastChild.remove();

    this.node.children[cursorIndex].before(CellArray.getDecimalArray(false));
    this.node.children[cursorIndex].before(CellArray.getCellArray(digit));

    this.input = this.input.slice(0, inputIndex) + digit + this.input.slice(inputIndex);

    if (cursorIndex <= this.cursorIndex) this.cursorIndex = Utilities.clamp(this.cursorIndex + 2, 0, this.cellCount);
    this.inputIndex = inputIndex <= this.inputIndex ? this.inputIndex + 1 : this.inputIndex;
  }

  // inserts a sign in place or toggles if within literal
  insertSign() {
    let cursorIndex = this.cursorIndex;
    let inputIndex = this.inputIndex;
    
    if (inputIndex === 0) {
      this.insert("_");
      return;
    }

    // if not on literal seek back for literal
    if (!Utilities.isLiteral(this.input[inputIndex]))
    {
      // if literal seek back to toggle sign
      if (Utilities.isLiteral(this.input[inputIndex - 1])) {
        inputIndex--;
        cursorIndex -= 2;
      } else {
        // if not literal, toggle sign
        this.insert("_");
        return;
      }
    }

    // if on literal, seek back to toggle sign
    for (let i = inputIndex; i >= 0; i--) {
      // correct index for decimal
      if (this.input[i] === '.') {
        i = Math.max(i - 1, 0);
      }

      // if on sign, toggle sign
      if (this.input[i] === '_') {
        if (cursorIndex >= 0) {
          this.deleteIndex(cursorIndex / 2);
          if (cursorIndex < this.cursorIndex) {
            this.cursorIndex = Math.max(this.cursorIndex - 2, 0);
          } else if (cursorIndex === this.cursorIndex) {
            this.addCursor();
          }
        }
        return;
      }

      // if index 0, toggle sign
      if (i === 0) {
        if (cursorIndex === 0) {
          this.node.lastChild.remove();
          this.node.lastChild.remove();
          this.node.firstChild.before(CellArray.getDecimalArray(false));
          this.node.firstChild.before(CellArray.getCellArray("_"));
          this.cursorIndex += 2;
        }
        this.input = "_" + this.input;
        this.inputIndex++;
        return;
      }

      // if not literal, add sign
      if (!Utilities.isLiteral(this.input[i])) {
        if (cursorIndex >= 0) {
          this.node.lastChild.remove();
          this.node.lastChild.remove();
          this.node.children[cursorIndex + 2].before(CellArray.getDecimalArray(false));
          this.node.children[cursorIndex + 2].before(CellArray.getCellArray("_"));
          this.cursorIndex = Utilities.clamp(this.cursorIndex + 2, 0, this.cellCount);
        }
        this.inputIndex++;
        this.input = this.input.slice(0, i) + "_" + this.input.slice(i);
        return;
      }

      cursorIndex -= 2;
    }
  }

  deleteIndex(digitIndex) {
    let cellIndex = Utilities.clamp(digitIndex * 2, 0, this.cellCount);
    this.node.children[cellIndex].remove();
    this.node.children[cellIndex].remove();

    let inputIndex = this.inputIndex - (this.cursorIndex / 2) + digitIndex - 1;
    let inputSplit = this.input.slice(0, inputIndex).split('.');
    if (inputSplit.length > 1) {
      inputIndex += inputSplit.length - 1;
    }

    let inputScroll = inputIndex + (this.digitCount - (cellIndex / 2));

    // scroll input digit
    if (this.input.length > inputScroll)
    {
      // case for decimal
      if (this.input[inputScroll] == '.') {
        this.node.append(CellArray.getDecimalArray(true));
        this.inputScroll++;
      } else {
        this.node.append(CellArray.getDecimalArray(false));
      }
      this.node.append(CellArray.getCellArray(this.input[inputScroll]));
    } else {
      this.node.append(CellArray.getDecimalArray(false));
      this.node.append(CellArray.getEmptyArray());
    }

    if (inputIndex < this.inputIndex) this.inputIndex--;
    this.input = this.input.slice(0, inputIndex) + this.input.slice(inputIndex + 1);
  }

  // clears the contents of the display and current formula
  clear() {
    this.inputIndex = 0;
    this.input = '';
    this.cursorIndex = 0;
    this.node.innerHTML = '';

    this.node.append(CellArray.getEmptyArray());

    while (this.node.children.length < this.cellCount)
    {
      this.node.append(CellArray.getDecimalArray(false));
      this.node.append(CellArray.getEmptyArray());
    }

    this.addCursor()
  }

  // increments cursor position
  incrementCursor() {
    if (this.inputIndex < this.input.length) {
      // increment for decimal
      if (this.input[this.inputIndex + 1] === '.'
        && this.cursorIndex != this.cellCount) {
        this.inputIndex++;
      }

      // increment input
      this.inputIndex++;

      this.removeCursor();

      this.shiftRight();

      // increment cursor
      this.cursorIndex = Math.min(this.cursorIndex + 2, this.cellCount);
      
      this.addCursor();
    }
  }

  // removes cursor at current index
  removeCursor() {
    if (this.id === 'input') {
      this.node.childNodes[this.cursorIndex].childNodes.forEach(node => {
        if (node.classList.contains("cursor")) node.classList.remove("cursor")
      });
    }
  }

  // adds cursor at current index
  addCursor() {
    if (this.id === 'input') {
      this.node.childNodes[this.cursorIndex].childNodes.forEach(node => node.classList.add("cursor"));
    }
  }

  // shifts the digit array one digit right
  shiftRight(force = false) {
    if (this.cursorIndex === this.cellCount || force) {
      
      // scroll right
      this.node.firstChild.remove();
      this.node.firstChild.remove();
      
      // scroll input digit
      if (this.inputIndex !== this.input.length)
      {
        // case for decimal
        if (this.input[this.inputIndex] == '.') {
          this.node.append(CellArray.getDecimalArray(true));
          this.inputIndex++;
        } else {
          this.node.append(CellArray.getDecimalArray(false));
        }
        this.node.append(CellArray.getCellArray(this.input[this.inputIndex]));
      } else {
        this.node.append(CellArray.getDecimalArray(false));
        this.node.append(CellArray.getEmptyArray());
      }
    }
  }

  // decrements cursor position
  decrementCursor() {
    if (this.inputIndex > 0) {
      // decrement input
      if (this.input[this.inputIndex - 1] === '.' &&
        this.cursorIndex !== 0) {
        this.inputIndex--;
      }
      this.inputIndex = Math.max(this.inputIndex - 1, 0);

      this.removeCursor();

      this.shiftLeft();

      // decrement cursor
      this.cursorIndex = Math.max(this.cursorIndex - 2, 0);

      this.addCursor();
    }
  }

  // shifts the digit array one digit left
  shiftLeft() {
    if (this.cursorIndex === 0) {
      this.node.lastChild.remove();
      this.node.lastChild.remove();

      if (this.input[this.inputIndex] === '.') {
        this.node.firstChild.before(CellArray.getDecimalArray(true));
        this.inputIndex--;
      } else {
        this.node.firstChild.before(CellArray.getDecimalArray(false));
      }

      this.node.firstChild.before(CellArray.getCellArray(this.input[this.inputIndex]));
    }
  }
  
  // shifts left to fit errors
  errorShift() {
    this.node.lastChild.remove();
    this.node.lastChild.remove();
    this.node.firstChild.before(CellArray.getDecimalArray(false));
    this.node.firstChild.before(CellArray.getCellArray(this.input[0]));
  }

  // sets the calculation result to right side
  setResult(result) {
    this.input = result;
    this.node.innerHTML = '';
    
    result.split('').forEach((digit, index) => {
      if (index === result.length - 1 && digit === '.') return;
      if (index === 0 && digit !== '.') {
        this.node.appendChild(CellArray.getCellArray(digit));
        return;
      }
      
      if (digit === '.') {
        this.node.appendChild(CellArray.getDecimalArray(true));
        return;
      }
      
      if (result[index - 1] !== '.') {
        this.node.appendChild(CellArray.getDecimalArray(false));
      }
      this.node.appendChild(CellArray.getCellArray(digit));
    });

    while (this.node.children.length < this.cellCount) {
      this.node.firstChild.before(CellArray.getDecimalArray(false));
      this.node.firstChild.before(CellArray.getEmptyArray());
    }
  }

  alignDisplay(align) {
    if (align === DisplayAlign.Left) {
      while (this.inputIndex !== 0) {
        this.decrementCursor();
      }
    } else if (align === DisplayAlign.Right) {
      while(this.inputIndex !== this.input.length) {
        this.incrementCursor();
      }
    }
  }
}

export { DigitArray };