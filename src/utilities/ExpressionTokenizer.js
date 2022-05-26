class ExpressionTokenizer {
  
  static GetTokens(input) {
    console.log(input);
    input.split('').forEach(digit => {

    });
  }
}

const ExpressionToken = (type, value) => { this.type = type; this.value = value; }

const ExpressionErrors = {
  syntaxError: "SYNTAXØERROR",
  divideByZero: "DIVIDEØBYØZERO",
  overflow: "OVERFLOW"
}

export { ExpressionTokenizer, ExpressionToken };