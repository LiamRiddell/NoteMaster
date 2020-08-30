/* eslint-disable class-methods-use-this */
class AST {
  variables = {};

  // Setters
  variable(name, value) {
    if (typeof value === 'undefined') {
      try {
        return this.variables[name].value;
      } catch (error) {
        return 0;
      }
    }

    this.variables[name.value] = {
      name: name.value,
      text: name.text,
      value
    };

    return value;
  }

  // LR: PEMDAS
  add(v1, v2) {
    return v1 + v2;
  }

  subtract(v1, v2) {
    return v1 - v2;
  }

  multiply(v1, v2) {
    return v1 * v2;
  }

  divide(v1, v2) {
    return v1 / v2;
  }

  exponent(v, exponent) {
    return v ** exponent;
  }

  sin(v) {
    return Math.sin(v);
  }

  cos(v) {
    return Math.cos(v);
  }

  tan(v) {
    return Math.tan(v);
  }

  asin(v) {
    return Math.asin(v);
  }

  acos(v) {
    return Math.acos(v);
  }

  atan(v) {
    return Math.atan(v);
  }

  sqrt(v) {
    return Math.sqrt(v);
  }

  logarithm(v) {
    return Math.log(v);
  }
}

const ast = new AST();
export default ast;
