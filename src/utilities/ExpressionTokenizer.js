class ExpressionTokenizer {
  
  static GetTokens(input) {
    console.log(input);

    let tokens = [];

    input.split('').forEach(char => {
      if (this.isLiteral(char)) { tokens.push(ExpressionToken("Literal", char)); }
      else if (this.isLetter(char)) { tokens.push(ExpressionToken("Letter", char)); } 
      else if (this.isOperator(char)) { tokens.push(ExpressionToken("Operator", char)); }
      else if (this.isLeftParenthesis(char)) { tokens.push(ExpressionToken("Left Parenthesis", char)); }
      else if (this.isRightParenthesis(char)) { tokens.push(ExpressionToken("Right Parenthesis", char)); }
    });

    console.log(tokens);
  }

  static isLiteral = (char) => /\d|_|\./.test(char);

  static isOperator = (char) => /÷|\*|\+|-|\^/.test(char);

  static isLetter = (char) => /[a-z]/i.test(char);

  static isRightParenthesis = (char) => char === ')';

  static isLeftParenthesis = (char) => char === '(';
}

const ExpressionToken = (type, value) => ({ type: type, value: value })

const ExpressionErrors = {
  syntaxError: "SYNTAXØERROR",
  divideByZero: "DIVIDEØBYØZERO",
  overflow: "OVERFLOW"
}

export { ExpressionTokenizer, ExpressionToken };