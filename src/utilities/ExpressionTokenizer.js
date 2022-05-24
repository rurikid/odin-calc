class ExpressionTokenizer {
  
  static GetTokens(input) {
    console.log(input);
    input.split('').forEach(digit => {

    });
  }
}

const ExpressionToken = (type, value) => { this.type = type; this.value = value; }

// TODO: back against _ causes duplicate
// TODO: back against . causes weird bug, digitIndex mixup when decimal off display
const ExpressionErrors = {
  syntaxError: "SYNTAXØERROR",
  divideByZero: "DIVIDEØBYØZERO",
  overflow: "OVERFLOW"
}

export { ExpressionTokenizer, ExpressionToken };