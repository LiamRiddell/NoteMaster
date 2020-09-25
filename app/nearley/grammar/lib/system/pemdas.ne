# Credits: https://github.com/kach/nearley/blob/master/examples/calculator/arithmetic.ne

# Lexer: Moo
@lexer lexer

# PEMDAS!
# We define each level of precedence as a nonterminal.

PemdasSystem
    -> _ AS _ {% (d) => d[1] %}

# Parentheses
P -> "(" _ AS _ ")" {% d => d[2] %}
    | N             {% id %}

# Exponents
E -> P _ %exponent _ E    {% d => ast.exponent(d[0], d[4]) %}
    | P             {% id %}

# Multiplication and division
MD -> MD _ %multiply _ E  {% d => ast.multiply(d[0], d[4]) %}
    | MD _ %divide _ E  {% d => ast.divide(d[0], d[4]) %}
    | E             {% id %}

# Addition and subtraction
AS -> AS _ %add _ MD {% d => ast.add(d[0], d[4]) %}
    | AS _ %subtract _ MD {% d => ast.subtract(d[0], d[4]) %}
    | MD            {% id %}

# A number or a function of a number
N ->  unit          {% id %}
    | currency      {% id %}
    | percent       {% id %}
    | integer       {% id %}
    | decimal       {% id %}
    | hex32         {% id %}
    | hex64         {% id %}
    | variable      {% id %}

    #Functions
    | "sin" _ P     {% d => ast.sin(d[2]) %}
    | "cos" _ P     {% d => ast.cos(d[2]) %}
    | "tan" _ P     {% d => ast.tan(d[2]) %}
    | "asin" _ P    {% d => ast.asin(d[2]) %}
    | "acos" _ P    {% d => ast.acos(d[2]) %}
    | "atan" _ P    {% d => ast.atan(d[2]) %}

    # Constants
    | "Pi"          {% d => ast.constant(Math.PI) %}
    | "E"           {% d => ast.constant(Math.E) %}
    | "sqrt" _ P    {% d => ast.sqrt(d[2]) %}
    | "ln" _ P      {% d => ast.logarithm(d[2])  %}
