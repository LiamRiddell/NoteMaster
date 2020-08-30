# Lexer: Moo
@lexer lexer

# No-operations -> Pass-through
noop 
    -> _ {% id %}

# Optional whitespace - Memory efficiency trick
_ -> %ws:* {% _ => null %}

# Mandatory whitespace - Memory efficiency trick
__ -> %ws:+ {% _ => null %}
