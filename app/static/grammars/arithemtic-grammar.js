// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
(function() {
  function id(x) {
    return x[0];
  }

  const moo = require('moo');

  const lexer = moo.compile({
    ws: /[ \t]+/,
    lparen: '(',
    rparen: ')',
    float: {
      match: /(?:^\+|\-?)(?:[1-9]\d{0,4}|0|)\.\d/,
      value: x => parseFloat(x)
    },
    int: {
      match: /(?:[+-]?)(?:\d+)/,
      value: x => parseInt(x)
    },
    exponent: ['^'],
    multiplication: ['*', 'times', 'multiply'],
    division: ['/', 'divide', 'divide by'],
    addition: ['+', 'add', 'plus'],
    subtraction: ['-', 'subtract', 'minus']
  });
  var grammar = {
    Lexer: lexer,
    ParserRules: [
      {
        name: 'main',
        symbols: ['_', 'AS', '_'],
        postprocess: function(d) {
          return d[1];
        }
      },
      {
        name: 'P',
        symbols: [
          lexer.has('lparen') ? { type: 'lparen' } : lparen,
          '_',
          'AS',
          '_',
          lexer.has('rparen') ? { type: 'rparen' } : rparen
        ],
        postprocess: function(d) {
          return d[2];
        }
      },
      { name: 'P', symbols: ['N'], postprocess: id },
      {
        name: 'E',
        symbols: ['P', '_', { literal: '^' }, '_', 'E'],
        postprocess: function(d) {
          return Math.pow(d[0], d[4]);
        }
      },
      { name: 'E', symbols: ['P'], postprocess: id },
      {
        name: 'MD',
        symbols: ['MD', '_', { literal: '*' }, '_', 'E'],
        postprocess: function(d) {
          return d[0] * d[4];
        }
      },
      {
        name: 'MD',
        symbols: ['MD', '_', { literal: '/' }, '_', 'E'],
        postprocess: function(d) {
          return d[0] / d[4];
        }
      },
      { name: 'MD', symbols: ['E'], postprocess: id },
      {
        name: 'AS',
        symbols: [
          'AS',
          '_',
          lexer.has('addition') ? { type: 'addition' } : addition,
          '_',
          'MD'
        ],
        postprocess: function(d) {
          return d[0] + d[4];
        }
      },
      {
        name: 'AS',
        symbols: ['AS', '_', { literal: '-' }, '_', 'MD'],
        postprocess: function(d) {
          return d[0] - d[4];
        }
      },
      { name: 'AS', symbols: ['MD'], postprocess: id },
      {
        name: 'N',
        symbols: [lexer.has('int') ? { type: 'int' } : int],
        postprocess: id
      },
      {
        name: 'N',
        symbols: [lexer.has('float') ? { type: 'float' } : float],
        postprocess: id
      },
      {
        name: 'N',
        symbols: [{ literal: 'sin' }, '_', 'P'],
        postprocess: function(d) {
          return Math.sin(d[2]);
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'cos' }, '_', 'P'],
        postprocess: function(d) {
          return Math.cos(d[2]);
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'tan' }, '_', 'P'],
        postprocess: function(d) {
          return Math.tan(d[2]);
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'asin' }, '_', 'P'],
        postprocess: function(d) {
          return Math.asin(d[2]);
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'acos' }, '_', 'P'],
        postprocess: function(d) {
          return Math.acos(d[2]);
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'atan' }, '_', 'P'],
        postprocess: function(d) {
          return Math.atan(d[2]);
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'pi' }],
        postprocess: function(d) {
          return Math.PI;
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'e' }],
        postprocess: function(d) {
          return Math.E;
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'sqrt' }, '_', 'P'],
        postprocess: function(d) {
          return Math.sqrt(d[2]);
        }
      },
      {
        name: 'N',
        symbols: [{ literal: 'ln' }, '_', 'P'],
        postprocess: function(d) {
          return Math.log(d[2]);
        }
      },
      { name: '_$ebnf$1', symbols: [] },
      {
        name: '_$ebnf$1',
        symbols: ['_$ebnf$1', lexer.has('ws') ? { type: 'ws' } : ws],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        }
      },
      { name: '_', symbols: ['_$ebnf$1'] }
    ],
    ParserStart: 'main'
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
