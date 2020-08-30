# Lexer: Moo
@lexer lexer


# Variables
# 1. $variableName = 100
# 2. $variableName = 100 + 20 - 20 * 10 / 100
# 3. $variableName = 100 + 20 - 20 * (10 / 100)
variable
    -> %identifier _ "=" variable_value {% d => ast.variable(d[0], d[3]) %}

# variable_value -> A set of values with operators joining them
variable_value
    -> _ AS _ {% (d) => d[1] %}