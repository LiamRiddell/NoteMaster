# Lexer: Moo
@lexer lexer

# Currency System - Entry
CurrencySystem
    -> currencyConversion {% id %}

# Current Formats
currency
    -> %currencySymbol _ number {% ([c,,v]) => ast.currency(v, c)%}
    | number _ %currencyCode  {% ([v,,c]) => ast.currency(v, c)%}

# Currency Rules
# 1. $100 in GBP
# 2. $100 in £
# 3. 100 USD in GBP
currencyConversion 
    -> currency _ %convertTo _ %currencyCode {% ([a,,,,b]) => ast.currencyConversion(a, b) %}
    | currency _ %convertTo _ %currencySymbol {% ([a,,,,b]) => ast.currencyConversion(a, b) %}
