import moo from 'moo';

// LR: Configure Lexer
const lexer = moo.compile({
  ws: /[ \t]+/,

  comment: [/^#.*?$/, /^\/\/.*?$/],

  float: {
    match: /(?:^\+|-?)(?:[1-9]\d{0,4}|0|)\.\d/,
    value: x => parseFloat(x)
  },
  int: {
    match: /(?:[+-]?)(?:\d+)/,
    value: x => parseInt(x, 10)
  },

  // LR: Basic Calculator
  lparen: '(',
  rparen: ')',
  // string: /"(?:\\["\\]|[^\n"\\])*"/,
  exponent: ['^'],
  multiplication: ['times', '*', 'multiply'],
  division: ['divide', 'divide by', '/'],
  addition: ['add', 'plus', '+'],
  subtraction: ['subtract', 'minus', '-'],
  function: [
    'sin',
    'cos',
    'tan',
    'asin',
    'acos',
    'atan',
    'pi',
    'e',
    'sqrt',
    'ln'
  ],
  word: /[a-zA-Z|-]+/,
  period: '.'
});

export default lexer;
