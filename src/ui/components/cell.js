class Cell {
  static getCell(isEnabled, isDecimal) {
    let cell = document.createElement("div");
    cell.className = `cell${isDecimal ? '-decimal' : ''} ${isEnabled ? 'cell-on' : ''}`;
    return cell;
  }
}

export { Cell };
