@{%
    const moo = require("moo");

    const lexer = moo.compile({
        ws: /[ \t]+/,
        lparen: "(",
        rparen: ")",
        float: {
            match: /(?:^\+|\-?)(?:[1-9]\d{0,4}|0|)\.\d/,
            value: (x) => parseFloat(x),
        },
        int: {
            match: /(?:[+-]?)(?:\d+)/,
            value: (x) => parseInt(x),
        },
        exponent: ["^"],
        multiplication: ["*", "times", "multiply"],
        division: ["/", "divide", "divide by"],
        addition: ["+", "add", "plus"],
        subtraction: ["-", "subtract", "minus"],
        sin: ["sin"],
        cos: ["cos"],
        tan: ["tan"],

        asin: ["asin"],
        acos: ["acos"],
        atan: ["atan"],

        pi: ["pi"],
        radian: ["radian"],
        sqrt: ["sqrt"],
        ln: ["ln"]
    });
%}

@lexer lexer

main -> _ AS _ {% function(d) {return d[1]; } %}

# PEMDAS!

# Parentheses
P -> %lparen _ AS _ %rparen {% function(d) {return d[2]; } %}
    | N             {% id %}

# Exponents
E -> P _ %exponent _ E    {% function(d) {return Math.pow(d[0], d[4]); } %}
    | P             {% id %}

# Multiplication and division
MD -> MD _ %multiplication _ E  {% function(d) {return d[0]*d[4]; } %}
    | MD _ %division _ E  {% function(d) {return d[0]/d[4]; } %}
    | E             {% id %}

# Addition and subtraction
AS -> AS _ %addition _ MD {% function(d) {return d[0]+d[4]; } %}
    | AS _ %subtraction _ MD {% function(d) {return d[0]-d[4]; } %}
    | MD            {% id %}

# A number or a function of a number
N ->  %int         {% id %}
    | %float       {% id %}
    | %sin _ P    {% function(d) {return Math.sin(d[2]); } %}
    | %cos _ P     {% function(d) {return Math.cos(d[2]); } %}
    | %tan _ P     {% function(d) {return Math.tan(d[2]); } %}

    | %asin _ P    {% function(d) {return Math.asin(d[2]); } %}
    | %acos _ P    {% function(d) {return Math.acos(d[2]); } %}
    | %atan _ P    {% function(d) {return Math.atan(d[2]); } %}

    | %pi         {% function(d) {return Math.PI; } %}
    | %radian          {% function(d) {return Math.E; } %}
    | %sqrt _ P    {% function(d) {return Math.sqrt(d[2]); } %}
    | %ln _ P      {% function(d) {return Math.log(d[2]); }  %}


_ -> %ws:*
