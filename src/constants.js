const Constants = {
  DigitCount: 14,
  Cursor: {
    id: "cursor",
    bits: [
      "00000000000000000000000000000011111"
    ]
  },
  Keys: [
    {
      id: "plusMinus",
      symbol: "+/-",
      bits: [
        "00000000000000011111000000000000000"
      ]
    },
    {
      id: "parentheses",
      symbol: "( )",
      bits: [
        "00001000100010000100001000001000001",
        "10000010000010000100001000100010000"
      ]
    },
    {
      id: "exponent",
      symbol: "y^x",
      style: 'style="font-style: italic;"',
      bits: [
        "00100010101000100000000000000000000"
      ]
    },
    {
      id: "sqrt",
      symbol: "√x",
      style: 'style="font-style: italic;"',
      bits: [
        "01110100011000001110000011000101110",
        "01110100011000110001101011001001101",
        "11110100011000111110101001001010001",
        "11111001000010000100001000010000100"
      ]
    },
    {
      id: "backspace",
      symbol: "←"
    },
    {
      id: "sin",
      symbol: "SIN",
      bits: [
        "01110100011000001110000011000101110",
        "01110001000010000100001000010001110",
        "10001100011100110101100111000110001"
      ]
    },
    {
      id: "numSeven",
      symbol: "7",
      bits: [
        "11111000010001000100010000100001000"
      ]
    },
    {
      id: "numEight",
      symbol: "8",
      bits: [
        "01110100011000101110100011000101110"
      ]
    },
    {
      id: "numNine",
      symbol: "9",
      bits: [
        "01110100011000101111000010001001100"
      ]
    },
    {
      id: "division",
      symbol: "÷",
      style: 'style="font-size: 1.5rem;"',
      bits: [
        "00000001000000011111000000010000000"
      ]
    },
    {
      id: "cosine",
      symbol: "COS",
      bits: [
        "01110100011000010000100001000110001",
        "01110100010111010001100011000101110",
        "01110100011000001110000011000101110"
      ]
    },
    {
      id: "numFour",
      symbol: "4",
      bits: [
        "00010001100101010010111110001000100"
      ]
    },
    {
      id: "numFive",
      symbol: "5",
      bits: [
        "11111100001111000001000011000101110"
      ]
    },
    {
      id: "numSix",
      symbol: "6",
      bits: [
        "00110010001000011110100011000101110"
      ]
    },
    {
      id: "multiply",
      symbol: "x",
      bits: [
        "00000100010101000100010101000100000"
      ]
    },
    {
      id: "tangent",
      symbol: "TAN",
      bits: [
        "11111001000010000100001000010000100",
        "01110100011000111111100011000110001",
        "10001100011100110101100111000110001"
      ]
    },
    {
      id: "numOne",
      symbol: "1",
      bits: [
        "00100011000010000100001000010001110"
      ]
    },
    {
      id: "numTwo",
      symbol: "2",
      bits: [
        "01110100010000100110010001000011111"
      ]
    },
    {
      id: "numThree",
      symbol: "3",
      bits: [
        "01110100010000101110000011000101110"
      ]
    },
    {
      id: "minus",
      symbol: "-",
      style: 'style="font-size: 1.5rem;"',
      bits: [
        "00000000000000011111000000000000000"
      ]
    },
    {
      id: "clear",
      symbol: "C"
    },
    {
      id: "numZero",
      symbol: "0",
      bits: [
        "01110100011001110101110011000101110"
      ]
    },
    {
      id: "decimal",
      symbol: "."
    },
    {
      id: "plusOne",
      symbol: "Σ+",
      bits: [
        "11111010010010000010001000100111111"
      ]
    },
    {
      id: "plus",
      symbol: "+",
      style: 'style="font-size: 1.5rem;"',
      bits: [
        "00000001000010011111001000010000000"
      ]
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