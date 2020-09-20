# Lexer: Moo
@lexer lexer

# Hex System - Entry
HexSystem 
    -> hexBitshiftRight {% id %}
    | hexBitshiftLeft {% id %}
    | hexBitshiftRightUnsigned {% id %}

# Hex Defintion
hex -> %hex {% d => ast.hex(d[0]) %}  

# Bit Shift
hexBitshiftRight -> hex _ ">>" _ integer {% ([h,,,,b]) => ast.bitwiseShiftRight(h, b) %}
hexBitshiftLeft -> hex _ "<<" _ integer {% ([h,,,,b]) => ast.bitwiseShiftLeft(h, b) %}
hexBitshiftRightUnsigned -> hex _ ">>>" _ integer {% ([h,,,,b]) => ast.bitwiseShiftRightUnsigned(h, b) %}

