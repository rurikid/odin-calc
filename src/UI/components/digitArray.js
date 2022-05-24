import { DisplayAlign } from "../../enums/displayAlign.js";
import { CellArray } from "./cellArray.js";
import { Errors } from "../../vs-common/vs-logger.js";
import { Utilities } from "../../utilities.js";
import { Cell } from "./cell.js";

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

      // if (digit === '_') {
      //   this.insertSign();
      //   return;
      // }

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
    let referenceCell = this.node.childNodes[this.cursorIndex].previousSibling;
    referenceCell.replaceWith(CellArray.getDecimalArray(
      referenceCell.id === "decimal" ? false : true
    ));

    this.input = this.input.slice(0, this.inputIndex) + '.' + this.input.slice(this.inputIndex);
    this.inputIndex++;
  }

  insertSign() {
    let referenceCell = this.node.childNodes[this.cursorIndex];
    
  }

  getInputGroup() {

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
  shiftRight() {
    if (this.cursorIndex === this.cellCount) {
      
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
      this.inputIndex--;

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
}

export { DigitArray };