import { Cell } from "./cell.js";

class CellArray {
  
  static getCellArray(bits) {
    if (bits == null) return this.getEmptyArray();
    
    let cellArray = document.createElement("div");
    cellArray.className = "flex-row flex-center cell-array";
    bits.split('').forEach(bit => cellArray.appendChild(Cell.getCell(bit === "1", false)));
    return cellArray;
  }

  static getDecimalArray(isEnabled)
  {
    let decimalArray = document.createElement("div");
    decimalArray.className = "flex-column flex-end cell-space";
    let cell = Cell.getCell(isEnabled, true);
    decimalArray.appendChild(cell);
    decimalArray.setAttribute("id", isEnabled ? "decimal" : "");
    return decimalArray;
  }

  static getEmptyArray()
  {
    let array = document.createElement("div");
    array.className = "flex-row flex-center cell-array";
    array.setAttribute("id", "empty");
    for (let i = 0; i < 35; i++) {
      array.appendChild(Cell.getCell(false, false));
    }
    return array;
  }
}

export { CellArray };