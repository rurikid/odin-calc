class Utilities {
  static clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  static isLiteral = (char) => /\d|_|\./.test(char);

  static isOperator = (char) => /÷|\*|\+|-|\^/.test(char);

  static isLetter = (char) => /[a-z]/i.test(char);

  static isRightParenthesis = (char) => char === ')';

  static isLeftParenthesis = (char) => char === '(';
}

export { Utilities };