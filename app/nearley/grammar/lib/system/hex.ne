# Lexer: Moo
@lexer lexer

# Hex System - Entry
HexSystem
    -> hexBitshiftRight {% id %}
    | hexBitshiftLeft {% id %}
    | hexBitshiftRightUnsigned {% id %}

# Hex Defintion
hex32 -> %hex32 {% d => ast.hex32(d[0]) %}
hex64 -> %hex64 {% d => ast.hex64(d[0]) %}

# Bit Shift - 32-Bit
hexBitshiftRight -> hex32 _ ">>" _ integer {% ([h,,,,b]) => ast.bitwiseShiftRight(h, b) %}
hexBitshiftLeft -> hex32 _ "<<" _ integer {% ([h,,,,b]) => ast.bitwiseShiftLeft(h, b) %}
hexBitshiftRightUnsigned -> hex32 _ ">>>" _ integer {% ([h,,,,b]) => ast.bitwiseShiftRightUnsigned(h, b) %}

