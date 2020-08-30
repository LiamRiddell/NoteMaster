import moo from 'moo';

// LR: Configure Lexer
const lexer = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\n/, lineBreaks: true },

  // Comments overule everything
  comment: /\/\/.*?$/,

  // Parenthesis
  lparen: '(',
  rparen: ')',

  // Date - These will clash with number parsing. This is why it takes precedence -> date-tokens.js
  date: /(?:[0-2][0-9]|(?:3)[0-1])(?:\/)(?:(?:(?:0)[0-9])|(?:(?:1)[0-2]))(?:\/)\d{4}/,

  // Basic Types - Order of precedence
  hex: {
    match: /0[xX][0-9a-fA-F]+/,
    lineBreaks: true,
    value: x => parseInt(x, 16) // 0xFF -> 255
  },
  decimal: {
    match: /(?:^\+|-?)(?:[1-9]\d{0,4}|0|)\.\d/,
    lineBreaks: true,
    value: x => parseFloat(x) // "10.0" -> 10.0f
  },
  integer: {
    match: /(?:[+-]?)(?:\d+)/,
    lineBreaks: true,
    value: x => parseInt(x, 10)
  },
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  boolean: {
    match: ['true', 'false'],
    lineBreaks: true,
    value: x => x === 'true'
  },

  // Variable Identiefier -> var $paulVar = ...
  identifier: {
    match: /\$[a-zA-Z][a-zA-Z_0-9]*/,
    value: x => x.replace('$', '')
  },

  // Arrows
  fatarrow: '=>',

  // Variable Assignment
  assign: '=',

  // Operators
  add: ['+', 'add', 'plus'],
  subtract: ['-', 'subtract', 'minus'],
  multiply: ['*', 'x', 'multiply', 'times'],
  divide: ['/', 'divide'],
  exponent: ['^', 'power', 'exponent'],

  // Constants
  // constants: "pi",

  // Functions
  // mathFunction: {match: /[a-zA-Z]+/, type: moo.keywords({
  //     KW: ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', ],
  // })},

  // Catch-all
  word: /[a-zA-Z|-]+/,
  undefined: /[^\s]+/
});

export default lexer;
