import { CharacterBits as Bits } from "../apis/characterBits.js"; 
import { DigitArray } from "./ui/components/digitArray.js";

const Constants = {
  DigitCount: 14,
  Cursor: {
    id: "cursor",
    bits: [
      Bits["cursor"]
    ]
  },
  Keys: [
    {
      id: "parentheses",
      symbol: "( )",
      bits: [
        Bits["("], Bits[")"]
      ],
      cursorOffset: -1,
      input: "()",
      inputOffset: -1
    },
    {
      id: "inverse",
      symbol: "1/x",
      style: 'style="font-style: italic;"',
      bits: [
        Bits["I"], Bits["N"], Bits["V"],
        Bits["("], Bits[")"]
      ],
      cursorOffset: -1,
      input: "INV()",
      inputOffset: -1
    },
    {
      id: "power",
      symbol: "y^x",
      style: 'style="font-style: italic;"',
      bits: [
        Bits["^"]
      ],
      input: "^"
    },
    {
      id: "sqrt",
      symbol: "√x",
      style: 'style="font-style: italic;"',
      bits: [
        Bits["S"], Bits["Q"], Bits["R"], Bits["T"],
        Bits["("], Bits[")"]
      ],
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
      bits: [
        Bits["S"], Bits["I"], Bits["N"],
        Bits["("], Bits[")"]
      ],
      cursorOffset: -1,
      input: "SIN()",
      inputOffset: -1
    },
    {
      id: "numSeven",
      symbol: "7",
      bits: [
        Bits["7"]
      ],
      input: "7"
    },
    {
      id: "numEight",
      symbol: "8",
      bits: [
        Bits["8"]
      ],
      input: "8"
    },
    {
      id: "numNine",
      symbol: "9",
      bits: [
        Bits["9"]
      ],
      input: "9"
    },
    {
      id: "division",
      symbol: "÷",
      style: 'style="font-size: 1.5rem;"',
      bits: [
        Bits["÷"]
      ],
      input: "/"
    },
    {
      id: "cosine",
      symbol: "COS",
      bits: [
        Bits["C"], Bits["O"], Bits["S"],
        Bits["("], Bits[")"]
      ],
      cursorOffset: -1,
      input: "COS()",
      inputOffset: -1
    },
    {
      id: "numFour",
      symbol: "4",
      bits: [
        Bits["4"]
      ],
      input: "4"
    },
    {
      id: "numFive",
      symbol: "5",
      bits: [
        Bits["5"]
      ],
      input: "5"
    },
    {
      id: "numSix",
      symbol: "6",
      bits: [
        Bits["6"]
      ],
      input: "6"
    },
    {
      id: "multiply",
      symbol: "x",
      bits: [
        Bits["*"]
      ],
      input: "x"
    },
    {
      id: "tangent",
      symbol: "TAN",
      bits: [
        Bits["T"], Bits["A"], Bits["N"],
        Bits["("], Bits[")"]
      ],
      cursorOffset: -1,
      input: "TAN()",
      inputOffset: -1
    },
    {
      id: "numOne",
      symbol: "1",
      bits: [
        Bits["1"]
      ],
      input: "1"
    },
    {
      id: "numTwo",
      symbol: "2",
      bits: [
        Bits["2"]
      ],
      input: "2"
    },
    {
      id: "numThree",
      symbol: "3",
      bits: [
        Bits["3"]
      ],
      input: "3"
    },
    {
      id: "minus",
      symbol: "-",
      style: 'style="font-size: 1.5rem;"',
      bits: [
        Bits["-"]
      ],
      input: "="
    },
    {
      id: "clear",
      symbol: "C"
    },
    {
      id: "numZero",
      symbol: "0",
      bits: [
        Bits["0"]
      ],
      input: "0"
    },
    {
      id: "decimal",
      symbol: "."
    },
    {
      id: "plusMinus",
      symbol: "+/-",
      bits: [
        Bits["_"]
      ],
      input: "_"
    },
    {
      id: "plus",
      symbol: "+",
      style: 'style="font-size: 1.5rem;"',
      bits: [
        Bits["+"]
      ],
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
      style: 'style="font-size: 1.5rem;"',
    }
  ]
}

export { Constants };