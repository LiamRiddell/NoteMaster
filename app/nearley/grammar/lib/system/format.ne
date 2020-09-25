# Lexer: Moo
@lexer lexer

# Format System - Entry
# NOTE: Used to ignore headers, comments.
FormatSystem
    -> header {% v => null %}
    |  comment {% v => null %}
    |  text {% v => null %}

# Basic Types
header -> _ %header
comment -> _ %comment
