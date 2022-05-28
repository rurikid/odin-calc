class ExpressionTokenizer {
  
  static GetTokens(input) {
    console.log(input);

    let tokens = [];
    let token = ExpressionToken();

    input.split('').forEach(char => {

      if (this.isLiteral(char)) {
        if (token.type === undefined) {
          token = ExpressionToken('Literal', char);
        } else if (token.type === 'Letter') {
          tokens.push(token);
          token = ExpressionToken('Literal', char);
        } else if (token.type === 'Literal') {
          token.value += char;
        }
        return;
      }
      else if (this.isLetter(char)) { 
        if (token.type === undefined) {
          token = ExpressionToken('Letter', char);
        } else if (token.type === "Letter") {
          token.value += char;
        } else if (token.type === "Literal") {
          tokens.push(token);
          token = ExpressionToken('Literal', char);
        } else {
          token = ExpressionToken('Letter', char);
        }
        return;
      }

      if (token.value !== undefined) {
        tokens.push(token);
        token = ExpressionToken();
      }

      if (this.isOperator(char)) { tokens.push(ExpressionToken("Operator", char)); }
      if (this.isLeftParenthesis(char)) { tokens.push(ExpressionToken("Left Parenthesis", char)); }
      if (this.isRightParenthesis(char)) { tokens.push(ExpressionToken("Right Parenthesis", char)); }
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