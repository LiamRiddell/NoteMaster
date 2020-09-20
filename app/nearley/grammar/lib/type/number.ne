# Lexer: Moo
@lexer lexer

# Simplified data type for decimal and integers
number
    -> integer {% id %}
    | decimal {% id %}

integer -> %integer {% d => ast.number(d[0]) %}
decimal -> %decimal {% d => ast.number(d[0]) %}
