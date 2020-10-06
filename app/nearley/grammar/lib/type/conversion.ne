# Lexer: Moo
@lexer lexer

convertTo -> "as" {% id %}
    | "to" {% id %}
    | "in" {% id %}
