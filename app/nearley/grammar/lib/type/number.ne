# Lexer: Moo
@lexer lexer

# Simplified data type for decimal and integers
number 
    -> %integer {% d => ast.number(d[0]) %}
    | %decimal {% d => ast.number(d[0]) %}