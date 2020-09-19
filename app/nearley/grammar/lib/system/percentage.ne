# Lexer: Moo
@lexer lexer

# Percatage System - Entry
PercentageSystem
    -> percentageOf {% id %}
    | percentageIncrease {% id %}
    | percentageDecrease {% id %}

# Percentage Formats
percent
    -> number _ "%"  {% ([v]) => ast.percent(v) %}

# Percent Rules
# 1. 10% of 100
percentageOf
    -> percent _ "of" _ number {% ([v,,,,p]) => ast.percentOf(v, p) %}
    | percent _ "of" _ unit {% ([v,,,,p]) => ast.percentOf(v, p) %}
    | percent _ "of" _ currency {% ([v,,,,p]) => ast.percentOf(v, p) %}
    # Variable Support
    | variable _ "of" _ number {% ([v,,,,p]) => ast.percentOf(v, p) %}
    | variable _ "of" _ unit {% ([v,,,,p]) => ast.percentOf(v, p) %}
    | variable _ "of" _ currency {% ([v,,,,p]) => ast.percentOf(v, p) %}
    | variable _ "of" _ variable {% ([v,,,,p]) => ast.percentOf(v, p) %}

# 2. increase 100 by 10%
percentageIncrease
    -> "increase" _ number  _ "by" _ percent {% ([,,v,,,,p]) => ast.percentIncrease(v, p) %}
    | "increase" _ unit  _ "by" _ percent {% ([,,v,,,,p]) => ast.percentIncrease(v, p) %}
    | "increase" _ currency  _ "by" _ percent {% ([,,v,,,,p]) => ast.percentIncrease(v, p) %}

    #Variable Support
    | "increase" _ variable  _ "by" _ percent {% ([,,v,,,,p]) => ast.percentIncrease(v, p) %}
    | "increase" _ variable  _ "by" _ variable {% ([,,v,,,,p]) => ast.percentIncrease(v, p) %}

# 3. decrease 100 by 10%
percentageDecrease
    -> "decrease" _ number  _ "by" _ percent {% ([,,v,,,,p]) => ast.percentDecrease(v, p) %}
    | "decrease" _ unit  _ "by" _ percent {% ([,,v,,,,p]) => ast.percentDecrease(v, p) %}
    | "decrease" _ currency  _ "by" _ percent {% ([,,v,,,,p]) => ast.percentDecrease(v, p) %}

    # Variable Support
    | "decrease" _ variable  _ "by" _ percent {% ([,,v,,,,p]) => ast.percentDecrease(v, p) %}
    | "decrease" _ variable  _ "by" _ variable {% ([,,v,,,,p]) => ast.percentDecrease(v, p) %}
