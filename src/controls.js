class Controls {
  display;

  constructor(display) {
    this.display = display;
    
    for (let i = 0; i < this.Keys.length; i++)
    {
      this.Keys[i].onclick = () => this.display.keystrokeHandler(this.Keys[i]);
    }
  }

  Keys = [
    {
      id: "parentheses",
      symbol: "( )",
      cursorOffset: -1,
      input: "()",
      inputOffset: -1
    },
    {
      id: "inverse",
      symbol: "1/x",
      style: 'style="font-style: italic;"',
      cursorOffset: -1,
      input: "INV()",
      inputOffset: -1
    },
    {
      id: "power",
      symbol: "y^x",
      style: 'style="font-style: italic;"',
      input: "^"
    },
    {
      id: "sqrt",
      symbol: "√x",
      style: 'style="font-style: italic;"',
      cursorOffset: -1,
      input: "SQRT()",
      inputOffset: -1
    },
    {
      id: "backspace",
      symbol: "←"
    },
    {
      id: "sin",
      symbol: "SIN",
      cursorOffset: -1,
      input: "SIN()",
      inputOffset: -1
    },
    {
      id: "numSeven",
      symbol: "7",
      input: "7"
    },
    {
      id: "numEight",
      symbol: "8",
      input: "8"
    },
    {
      id: "numNine",
      symbol: "9",
      input: "9"
    },
    {
      id: "division",
      symbol: "÷",
      style: 'style="font-size: 1.5rem;"',
      input: "÷"
    },
    {
      id: "cosine",
      symbol: "COS",
      cursorOffset: -1,
      input: "COS()",
      inputOffset: -1
    },
    {
      id: "numFour",
      symbol: "4",
      input: "4"
    },
    {
      id: "numFive",
      symbol: "5",
      input: "5"
    },
    {
      id: "numSix",
      symbol: "6",
      input: "6"
    },
    {
      id: "multiply",
      symbol: "x",
      input: "*"
    },
    {
      id: "tangent",
      symbol: "TAN",
      cursorOffset: -1,
      input: "TAN()",
      inputOffset: -1
    },
    {
      id: "numOne",
      symbol: "1",
      input: "1"
    },
    {
      id: "numTwo",
      symbol: "2",
      input: "2"
    },
    {
      id: "numThree",
      symbol: "3",
      input: "3"
    },
    {
      id: "minus",
      symbol: "-",
      style: 'style="font-size: 1.5rem;"',
      input: "-"
    },
    {
      id: "clear",
      symbol: "C"
    },
    {
      id: "numZero",
      symbol: "0",
      input: "0"
    },
    {
      id: "decimal",
      symbol: ".",
      input: "."
    },
    {
      id: "plusMinus",
      symbol: "+/-",
      input: "_"
    },
    {
      id: "plus",
      symbol: "+",
      style: 'style="font-size: 1.5rem;"',
      input: "+"
    },
    {
      id: "leftArrow",
      symbol: "‹",
      style: 'style="font-size: 1.5rem;"'
    },
    {
      id: "enterBtn",
      symbol: "ENTER"
    },
    {
      id: "rightArrow",
      symbol: "›",
      style: 'style="font-size: 1.5rem;"'
    }
  ];
}

export { Controls };