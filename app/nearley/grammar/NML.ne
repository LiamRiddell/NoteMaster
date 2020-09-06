# NML.ne - NoteMaster Language
# Grammar by Liam Riddell
# Thanks to https://github.com/airportyh/smallang/blob/03-fun-call-and-multi-line/small.ne
# ----------------------------
# Notes:
#   - The moo lexer has been overriden to ignore word + undefined tokens.
# ----------------------------

@{%
    // LR: As this is transpiled from ES6 module export we need to specify the default
    const lexer = require("../../lexer/lexer").default;
    const ast = require("../../ast/ast").default;
%}

# Lexer: Moo
@lexer lexer

# Grammar Imports
@include "./includes/whitespace.ne"
@include "./includes/arithmetic.ne"
@include "./includes/variable.ne"

# Grammar Entry
main
    -> variable
    | PEMDAS


