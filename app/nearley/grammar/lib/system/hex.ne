# Lexer: Moo
@lexer lexer

# Hex System - Entry
HexSystem
  -> hexBitshiftRight {% id %}
  | hexBitshiftLeft {% id %}
  | hexBitshiftRightUnsigned {% id %}

# Hex Defintion
hex
  -> hex32 {% id %}
  |  hex64 {% id %}

hex32
  -> %hex32 {% d => ast.hex32(d[0]) %}
hex64
  -> %hex64 {% d => ast.hex64(d[0]) %}

# Bitwise Operations
# NOTE: 32/64-Bit switching is handled in the ast functions for simplicity.
hexBitshiftRight
  -> hex _ ">>" _ integer {% ([h,,,,b]) => ast.bitwiseShiftRight(h, b) %}
  | variable _ ">>" _ integer {% ([h,,,,b]) => ast.bitwiseShiftRight(h, b) %}

hexBitshiftLeft
  -> hex _ "<<" _ integer {% ([h,,,,b]) => ast.bitwiseShiftLeft(h, b) %}
  | variable _ "<<" _ integer {% ([h,,,,b]) => ast.bitwiseShiftLeft(h, b) %}

hexBitshiftRightUnsigned
  -> hex32 _ ">>>" _ integer {% ([h,,,,b]) => ast.bitwiseShiftRightUnsigned(h, b) %}
  | variable _ ">>>" _ integer {% ([h,,,,b]) => ast.bitwiseShiftRightUnsigned(h, b) %}

