import { Cell } from "./cell.js";
import { CharacterBits as Bits } from "../../../apis/characterBits.js";

class CellArray {
  
  static getCellArray(digit) {
    if (digit == null) return this.getEmptyArray();
    
    let cellArray = document.createElement("div");
    cellArray.className = "flex-row flex-center cell-array";
    Bits[digit].split('').forEach(bit => cellArray.appendChild(Cell.getCell(bit === "1", false)));
    return cellArray;
  }

  static getDecimalArray(isEnabled)
  {
    let decimalArray = document.createElement("div");
    decimalArray.className = "flex-column flex-end cell-space";
    decimalArray.id = "decimal";
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
