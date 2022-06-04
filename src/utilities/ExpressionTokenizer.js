import { Utilities } from './utilities.js';

class ExpressionTokenizer {
   
  static GetTokens(input) {
    console.log(input);

    let tokens = [];
    let token = ExpressionToken();

    input.split('').forEach(char => {

      if (Utilities.isLiteral(char)) {
        if (token.type === undefined) {
          token = ExpressionToken(TokenTypes.literal, char === '_' ? '-' : char);
        } else if (token.type === TokenTypes.function) {
          tokens.push(token);
          token = ExpressionToken(TokenTypes.literal, char === '_' ? '-' : char);
        } else if (token.type === TokenTypes.literal) {
          token.value += char === '_' ? '-' : char;
        }
        return;
      }
      else if (Utilities.isLetter(char)) { 
        if (token.type === undefined) {
          token = ExpressionToken(TokenTypes.function, char);
        } else if (token.type === TokenTypes.function) {
          token.value += char;
        } else if (token.type === TokenTypes.literal) {
          tokens.push(token);
          token = ExpressionToken(TokenTypes.literal, char);
        } else {
          token = ExpressionToken(TokenTypes.function, char);
        }
        return;
      }

      if (token.value !== undefined) {
        tokens.push(token);
        token = ExpressionToken();
      }

      if (Utilities.isOperator(char)) { tokens.push(ExpressionToken(TokenTypes.operator, char)); return; }
      if (Utilities.isLeftParenthesis(char)) { tokens.push(ExpressionToken(TokenTypes.leftParenthesis, char)); return; }
      if (Utilities.isRightParenthesis(char)) { tokens.push(ExpressionToken(TokenTypes.rightParenthesis, char)); return; }

    });

    if (token.value !== undefined) {
      tokens.push(token);
    }

    console.log(tokens);
    
    this.evaluateSyntax(tokens);
    
    return tokens;
  }

  static evaluateSyntax(tokens) {
    if (tokens.length <= 1 && tokens[0].type !== TokenTypes.literal) throw ExpressionErrors.syntaxError;
    if (tokens.length === 2) throw ExpressionErrors.syntaxError;

    tokens.forEach((token, index) => {
      if (index === 0) {
        switch(token.type) {
          case TokenTypes.rightParenthesis:
          case TokenTypes.operator:
            throw ExpressionErrors.syntaxError;
        }
      } else if (index === tokens.length - 1) {
        switch(token.type) {
          case TokenTypes.leftParenthesis:
          case TokenTypes.function:
          case TokenTypes.operator:
            throw ExpressionErrors.syntaxError;
        }
      } else if (index !== 0 && index !== tokens.length - 1) {
        let backType = tokens[index - 1].type;
        let foreType = tokens[index + 1].type;
        
        switch(token.type) {
          case TokenTypes.function:
            if (backType === TokenTypes.rightParenthesis ||
              backType === TokenTypes.literal ||
              backType === TokenTypes.function ||
              foreType !== TokenTypes.leftParenthesis) throw ExpressionErrors.syntaxError;
            break;
  
          case TokenTypes.leftParenthesis:
            if (backType === TokenTypes.rightParenthesis ||
              backType === TokenTypes.literal ||
              foreType === TokenTypes.rightParenthesis ||
              foreType === TokenTypes.operator) throw ExpressionErrors.syntaxError;
            break;
  
          case TokenTypes.rightParenthesis:
            if (backType === TokenTypes.function ||
              backType === TokenTypes.leftParenthesis ||
              backType === TokenTypes.operator ||
              foreType === TokenTypes.function ||
              foreType === TokenTypes.leftParenthesis ||
              foreType === TokenTypes.literal) throw ExpressionErrors.syntaxError;
            break;
  
          case TokenTypes.literal:
            if (backType === TokenTypes.literal ||
              backType === TokenTypes.function ||
              backType === TokenTypes.rightParenthesis ||
              foreType === TokenTypes.literal ||
              foreType === TokenTypes.function ||
              foreType === TokenTypes.leftParenthesis) throw ExpressionErrors.syntaxError;
            break;
  
          case TokenTypes.operator:
            if (backType === TokenTypes.function ||
              backType === TokenTypes.leftParenthesis ||
              backType === TokenTypes.operator ||
              foreType === TokenTypes.rightParenthesis ||
              foreType === TokenTypes.operator) throw ExpressionErrors.syntaxError;
            break;
        }
      }
    });
  }

  static evaluate(tokens) {
    // error cases
    if ((tokens[0].type === TokenTypes.function &&
      tokens[1].type !== TokenTypes.leftParenthesis) ||
      tokens[0].type === TokenTypes.operator) throw ExpressionErrors.syntaxError;
    
    // recursion end cases
    if (tokens.length === 0) return ExpressionToken[TokenTypes.literal, 0];
    if (tokens.length === 1 &&
      tokens[0].type === TokenTypes.literal) return tokens[0];

    // first element function or group
    if (tokens[0].type === TokenTypes.rightParenthesis) return ExpressionToken[TokenTypes.literal, 0];
    if (tokens[0].type === TokenTypes.function) {
      tokens = this.evaluateFunction(tokens);
    }
    if (tokens[0].type === TokenTypes.leftParenthesis) {
      tokens = this.evaluateGroup(tokens);
    }
    
    // evaluate literal + operator + (literal/function/group);
    if (tokens[0].type === TokenTypes.literal && tokens[1].type === TokenTypes.operator) {
      if (tokens.length > 3 && tokens[2].type === TokenTypes.literal &&
        tokens[3].value === "^") {
          tokens = [...tokens.slice(0, 2), ...this.operateGroup(tokens.slice(2))];
        } else {
          tokens = this.operateGroup(tokens);
        }

      return this.evaluate(tokens);
    }

    return tokens[0];
  }

  static operateGroup(tokens) {
    // evaluate literal + operator + (literal/function/group);
    if (tokens[2].type === TokenTypes.literal) {
      let resultToken = this.operate(tokens[0], tokens[1], tokens[2]);
      tokens = [resultToken, ...tokens.slice(3)];
    } else if (tokens[2].type === TokenTypes.function) {
      let functionResultTokens = this.evaluateGroup(tokens.slice(3));
      let resultToken = this.operate(tokens[0], tokens[1],
        this.performFunction(tokens[2].value, functionResultTokens[0]));
      tokens = [resultToken, ...functionResultTokens.slice(1)];
    } else if (tokens[2].type === TokenTypes.leftParenthesis) {
      let groupResultTokens = this.evaluateGroup(tokens.slice(2));
      let resultToken = this.operate(tokens[0], tokens[1], groupResultTokens[0]);
      tokens = [resultToken, ...groupResultTokens.slice(1)];
    }
    return tokens;
  }

  static evaluateGroup(tokens) {
    let closeIndex = this.getClosingGroupIndex(tokens);
    let groupResultToken = this.evaluate(tokens.slice(1, closeIndex));
    return [groupResultToken, ...tokens.slice(closeIndex + 1)];
  }

  static evaluateFunction(tokens) {
    let closeIndex = this.getClosingGroupIndex(tokens.slice(1));
    let functionResultToken = this.performFunction(tokens[0].value, tokens.slice(2, closeIndex + 1)); // +1 for sliced function
    return [functionResultToken, ...tokens.slice(closeIndex + 2)];
  }

  static getClosingGroupIndex(tokens) {
    let parenthesisCount = 0;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === TokenTypes.leftParenthesis) parenthesisCount++;
      if (tokens[i].type === TokenTypes.rightParenthesis) parenthesisCount--;
      if (parenthesisCount === 0) return i;
    }
  }

  static operate(lhs, operator, rhs) {
    console.log(parseFloat(lhs.value));
    console.log(Math.pow(parseFloat(lhs.value), parseFloat(rhs.value)));
    let result;
    switch(operator.value) {
      case '^':
        result = parseFloat(lhs.value) > 0 ?
          Math.pow(parseFloat(lhs.value), parseFloat(rhs.value)) :
          -Math.pow(-parseFloat(lhs.value), parseFloat(rhs.value));
        break;
      case '÷':
        if (rhs.value === '0') throw ExpressionErrors.divideByZero;
        result = parseFloat(lhs.value) / parseFloat(rhs.value);
        break;
      case '*':
        result = parseFloat(lhs.value) * parseFloat(rhs.value);
        break;
      case '-':
        result = parseFloat(lhs.value) - parseFloat(rhs.value);
        break;
      case '+':
        result = parseFloat(lhs.value) + parseFloat(rhs.value);
        break;
      default:
        result = parseFloat(lhs.value);
    }
    return ExpressionToken(TokenTypes.literal, result);
  }

  static performFunction(method, token) {
    let value = parseFloat(token.value);
    let result;
    switch (method) {
      case 'SIN':
        result = Math.sin(value);
        break;
      case 'COS':
        result = Math.cos(value);
        break;
      case 'TAN':
        result = Math.tan(value);
        break;
      case 'INV':
        if (value === 0) throw ExpressionErrors.divideByZero;
        result = 1 / value;
        break;
      case 'SQRT':
        if (value < 0) throw ExpressionErrors.sqrtNegative;
        result = Math.sqrt(value);
        break;
      default:
        result = 0;
    }
    return ExpressionToken(TokenTypes.literal, result);
  }
}

const ExpressionToken = (type, value) => ({ type: type, value: value })

const ExpressionErrors = {
  syntaxError: "SYNTAXØERROR",
  divideByZero: "DIVIDEØBYØZERO",
  overflow: "OVERFLOW",
  sqrtNegative: "SQRT(NEG)"
}

const TokenTypes = {
  literal: 'Literal',
  operator: 'Operator',
  leftParenthesis: 'Left Parenthesis',
  rightParenthesis: 'Right Parenthesis',
  function: 'Function'
}

export { ExpressionTokenizer, ExpressionToken, ExpressionErrors };