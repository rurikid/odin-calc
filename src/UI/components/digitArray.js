import { DisplayAlign } from "../../enums/displayAlign.js";
import { CellArray } from "./cellArray.js";
import { CharacterBits as Bits } from "../../../apis/characterBits.js";
import { Errors } from "../../vs-common/vs-logger.js";

class DigitArray {
  node;
  digitCount;
  input;
  inputIndex;
  cursorIndex;
  alignment;
  
  constructor(id, digitCount, displayAlign) {
    this.digitCount = digitCount;
    this.cursorIndex = 0;
    this.input = '';
    this.inputIndex = 0;
    this.alignment = displayAlign.alignment.alignment;

    this.node = document.createElement("div");
    this.node.id = id;
    this.node.className = "flex-row digit-array";

    for (let i = 1; i <= this.digitCount; i++) {
      this.node.appendChild(CellArray.getEmptyArray());
      if (i != this.digitCount) {
        this.node.appendChild(CellArray.getDecimalArray());
      }
    }
  }

  insert(digits, cursorOffset) {
    digits.split('').forEach(char => this.appendRight(char));
    
    for (let i = Math.abs(cursorOffset); i > 0; i--) {
      if (cursorOffset > 0) {
        this.incrementCursor();
      } else {
        this.decrementCursor();
      }
    }
  }

  // replaces the node at {index} with {digit}
  setDigit(digit, index) {
    if (digit === null || digit === undefined) Errors.error(`setDigit(${digit}, ${index}); digit is null`);
    if (index > this.digitCount * 2 - 1) Errors.error(`setDigit(${digit}, ${index}); index out of range`);
    
    this.input = this.input.slice(0, index) + digit + this.input.slice(index);

    this.node.replaceChild(CellArray.getCellArray(Bits[digit]), this.node.childNodes[index]);

    let node = document.getElementById(this.node.id).childNodes[index];
    document.getElementById(this.node.id).replaceChild(this.node.childNodes[index], node);
  }

  // removes the digit or decimal immediately preceding the cursor
  backspace() {
    this.decrementCursor();
    this.setDigit(null, this.cursorIndex);

    if (cursorIndex == 0) return;
    this.node.replaceChild(CellArray.getEmptyArray(), this.node.childNodes[cursorIndex - 2]);

    let node = document.getElementById(this.node.id).childNodes[cursorIndex - 2];
    document.getElementById(this.node.id).replaceChild(this.node.childNodes[cursorIndex - 2], node);
  }

  // sets the display to digitString
  setDisplay(digitString) {
    this.clear();
    this.input = digitString;
    this.inputIndex = input.length;

    for (let i = 0; i < digitString.length; i++) {
      if (this.alignment === DisplayAlign.Right) {
        this.appendLeft(digitString[i]);
      }
      this.appendRight(digitString[i]);
    }

    this.updateNode();
  }

  // appends a decimal immediately following the cursor
  addDecimal() {
    if (this.cursorIndex === 0) {
      this.appendRight("0");
    }
    this.node.childNodes[this.cursorIndex - 1].replaceWith((CellArray.getDecimalArray(true)));
    this.updateDigit(this.cursorIndex - 1);
  }

  // shifts the digitArray {count} times to the left
  shiftLeft(count) {

  }

  // shifts the digitArray {count} times to the right
  shiftRight(count) {

  }

  // appends {digit} at {index}
  appendRight(digit) {
    this.node.insertBefore(CellArray.getEmptyArray(), this.node.childNodes[this.cursorIndex]);
    this.node.insertBefore(CellArray.getDecimalArray(false), this.node.childNodes[this.cursorIndex + 1]);

    this.toggleDigit(this.node.childNodes.length - 1);
    this.setDigit(digit, this.cursorIndex);

    this.incrementCursor();
  }

  // clears the contents of the display and current formula
  clear() {
    this.input = '';
    this.inputIndex = 0;
    this.cursorIndex = 0;
    this.node.innerHTML = '';

    for (let i = 1; i <= this.digitCount; i++) {
      this.node.appendChild(CellArray.getEmptyArray());
      if (i != this.digitCount) {
        this.node.appendChild(CellArray.getDecimalArray());
      }
    }
    this.updateNode();
  }

  // increments cursor position
  incrementCursor() {
    this.cursorIndex = this.cursorIndex + 2;
    this.inputIndex++;
  }

  // decrements cursor position
  decrementCursor() {
    this.cursorIndex = this.cursorIndex === 0 ? 0 : this.cursorIndex - 2;
    this.inputIndex = this.inputIndex === 0 ? 0 : this.inputIndex - 1;

    if (this.cursorIndex === 0 && this.inputIndex !== 0) {
      if (this.node.children[this.digitCount].id == "empty") {
        this.removeChild(this.digitCount);
      } else {
        this.toggleDigit(this.digitCount);
      }
      this.toggleDigit(this.inputIndex);
    }
  }

  // toggles a digit display at {index}
  toggleDigit(index) {
    if (this.node.childNodes[index].id === "empty") {
      this.node.childNodes[index--].remove();
      this.node.childNodes[index--].remove();
    } else {
      if (this.node.childNodes[index].style.display === "none") {
        this.node.childNodes[index].style.display = "inherit";
      } else {
        this.node.childNodes[index].style.display = "none";
      }
    }
    this.updateDigit(index);
  }

  // removes child at {index}
  removeChild(index) {
    this.node.childNodes[(index)].remove();    
  }

  // updates the node at {index}
  updateDigit(index) {
    let node = document.getElementById(this.node.id).childNodes[index];
    document.getElementById(this.node.id).replaceChild(this.node.childNodes[index], node);
  }

  // updates parent node
  updateNode() {
    document.getElementById(this.node.id).innerHTML = this.node.innerHTML;
  }
}

export { DigitArray };