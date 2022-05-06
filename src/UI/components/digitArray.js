import { CellArray } from "./cellArray.js";

class DigitArray {
  node;
  
  constructor(id, digitCount) {
    this.node = document.createElement("div");
    this.node.id = id;
    this.node.className = "flex-row digit-array";
    
    for (let i = 1; i <= digitCount; i++) {
      this.node.appendChild(CellArray.getEmptyArray());
      if (i != digitCount) {
        this.node.appendChild(CellArray.getDecimalArray());
      }
    }
  }

  update(digit, index) {
    this.node.replaceChild(CellArray.getCellArray(digit), this.node.childNodes[index]);

    let node = document.getElementById(this.node.id).childNodes[index];
    document.getElementById(this.node.id).replaceChild(this.node.childNodes[index], node);
  }

  // removes the digit or decimal immediately preceding the cursor
  static backspace(index) {

  }

  // appends a decimal immediately following the cursor
  static addDecimal(index) {

  }

  // shifts the digitArray {count} times to the left
  static shiftLeft(count) {

  }

  // shifts the digitArray {count} times to the right
  static shiftRight(count) {

  }

  // appends {digit} at {index}
  static appendRight(digits, index) {

  }

  // appends {digit} 
  static appendLeft(digit) {

  }

  // clears the contents of the display
  static clear() {

  }
}

export { DigitArray };