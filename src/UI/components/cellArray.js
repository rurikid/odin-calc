import { Cell } from "./cell.js";

class CellArray {
  static getCellArray(digit) {
    let cellArray = document.createElement("div");
    cellArray.className = "flex-row flex-center cell-array";
    digit.bits[0].split('').forEach(bit => cellArray.appendChild(Cell.getCell(bit === "1", false)));
    return cellArray;
  }

  static getDecimalArray(isEnabled)
  {
    let decimalArray = document.createElement("div");
    decimalArray.className = "flex-column flex-end cell-space";
    let cell = Cell.getCell(isEnabled, true);
    decimalArray.appendChild(cell);
    return decimalArray;
  }

  static getEmptyArray()
  {
    let array = document.createElement("div");
    array.className = "flex-row flex-center cell-array";
    for (let i = 0; i < 35; i++) {
      array.appendChild(Cell.getCell(false, false));
    }
    return array;
  }
}

export { CellArray };