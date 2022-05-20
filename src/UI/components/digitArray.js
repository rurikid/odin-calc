import { DisplayAlign } from "../../enums/displayAlign.js";
import { CellArray } from "./cellArray.js";
import { Errors } from "../../vs-common/vs-logger.js";
import { Cell } from "./cell.js";

class DigitArray {
  node;
  digitCount;
  cellCount;
  input;
  inputIndex;
  cursorIndex;
  alignment;
  
  constructor(id, digitCount, displayAlign) {
    this.digitCount = digitCount;
    this.cellCount = digitCount * 2 - 2;
    this.input = '';
    this.inputIndex = 0;
    this.cursorIndex = 0;
    this.displayAlign = displayAlign;

    this.node = document.createElement("div");
    this.node.className = "flex-row digit-array";
    this.node.id = id;

    this.clear();
  }

  // replaces the node at {index} with {digit}
  setDigit(digit, index) {

  }

  // removes the digit or decimal immediately preceding the cursor
  backspace() {

  }

  // sets the display to digitString
  setDisplay(digits) {
    this.clear();
    this.insert(digits)
  }

  // appends a decimal immediately following the cursor
  addDecimal() {

  }

  // shifts the digitArray {count} times to the left
  shiftLeft(count) {

  }

  // shifts the digitArray {count} times to the right
  shiftRight(count) {

  }

  // appends {digit} at {index}
  insert(digits, cursorOffset = 0) {
    // get reference node
    let referenceCell = this.node.childNodes[this.cursorIndex];

    // needs to replace item at current index
    digits.split('').forEach(digit => {
      // insert before reference node, cell + decimal
      referenceCell.before(CellArray.getCellArray(digit));
      referenceCell.before(CellArray.getDecimalArray(digit === '.' ? true : false));
  
      // remove reference node and decimal
      if (referenceCell !== this.node.lastChild) referenceCell.nextSibling.remove();
      referenceCell.remove();

      // update input
      this.input = this.input.slice(0, this.inputIndex) + digit + this.input.slice(this.inputIndex);

      console.log(this.input);
      console.log(this.cursorIndex);

      // increment cursor
      this.incrementCursor();

      // update reference node
      referenceCell = this.node.childNodes[this.cursorIndex];
    })
    console.log(cursorOffset);

    // correct for cursor offset
    this.cursorIndex += cursorOffset;
    this.inputIndex += cursorOffset;

    console.log(this.input);
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
  }

  // increments cursor position
  incrementCursor() {
    this.inputIndex++;

    if (this.cursorIndex === this.cellCount) {
      // scroll right
      this.node.firstChild.remove();
      this.node.firstChild.remove();
      
      // scroll input digit
      if (this.inputIndex !== this.input.length)
      {
        console.log("scroll");
        // case for decimal
        if (this.input[this.inputIndex] == '.') {
          this.node.lastChild.before(CellArray.getDecimalArray(true));
          this.inputIndex++;
        } else {
          this.node.lastChild.before(CellArray.getDecimalArray(false));
        }
        this.node.lastChild.replaceWith(CellArray.getCellArray(this.input[this.inputIndex]));
      } else {
        this.node.append(CellArray.getEmptyArray());
      }
    }

    this.cursorIndex = Math.min(this.cursorIndex + 2, this.cellCount);
    
    this.node.children[this.cursorIndex].classList += ' cursor';
  }

  // decrements cursor position
  decrementCursor() {

  }

  // removes child at {index}
  removeChild(index) {

  }
}

export { DigitArray };