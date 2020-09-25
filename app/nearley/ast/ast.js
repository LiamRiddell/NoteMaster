/* eslint-disable valid-typeof */
/* eslint-disable class-methods-use-this */
// Result Types
const NMLNumberResult = require('./result/nml-number-result');
const NMLUnitResult = require('./result/nml-unit-result');
const NMLCurrencyResult = require('./result/nml-currency-result');
const NMLComputedResult = require('./result/nml-computed-result');
const NMLPercentResult = require('./result/nml-percent-result');
const NMLHexResult = require('./result/nml-hex-result');
const NMLHex64Result = require('./result/nml-hex64-result');

// Services
const unitService = require('./services/unit-service');
const currencyService = require('./services/currency-service');
const percentageService = require('./services/percentage-service');
const hexService = require('./services/hex-service');

class AST {
  variables = {};

  // Variable
  variable = (name, value) => {
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
  };

  // ResultFactories
  constant = value => {
    if (typeof token !== 'NMLUnitResult')
      return new NMLNumberResult(value, null);

    return value;
  };

  number = token => {
    if (typeof token !== 'NMLUnitResult')
      return new NMLNumberResult(token.value, token);

    return token;
  };

  currency = (valueToken, currencyToken) => {
    return new NMLCurrencyResult(valueToken.value, currencyToken);
  };

  unit = (valueToken, unitToken) => {
    return new NMLUnitResult(valueToken.value, unitToken);
  };

  percent = token => {
    return new NMLPercentResult(token.value, token);
  };

  hex32 = token => {
    return new NMLHexResult(token.value, token);
  }

  hex64 = token => {
    return new NMLHex64Result(token.value, token);
  }

  // PEMDAS
  add = (v1, v2) => {
    // LR: Hex 64-Bit
    if (v1 instanceof NMLHex64Result && v2 instanceof NMLHex64Result)
      return hexService.add64(v1, v2);

    if (v1 instanceof NMLHex64Result || v2 instanceof NMLHex64Result)
      throw 'You cannot mix 64-Bit with 32-Bit Types!';

    // LR: Percentage
    if (v2 instanceof NMLPercentResult) return percentageService.add(v1, v2);

    // LR: UoM
    if (v1 instanceof NMLUnitResult || v2 instanceof NMLUnitResult)
      return unitService.add(v1, v2);

    // LR: Currency
    if (v1 instanceof NMLCurrencyResult || v2 instanceof NMLCurrencyResult)
      return currencyService.add(v1, v2);

    // LR: Hex 32-Bit
    if (v1 instanceof NMLHexResult || v2 instanceof NMLHexResult)
      return hexService.add(v1, v2);



    // LR: Default
    return new NMLComputedResult(v1.value + v2.value);
  };

  subtract = (v1, v2) => {
    // LR: Hex 64-Bit
    if (v1 instanceof NMLHex64Result && v2 instanceof NMLHex64Result)
      return hexService.subtract(v1, v2);

    if (v1 instanceof NMLHex64Result || v2 instanceof NMLHex64Result)
      throw 'You cannot mix 64-Bit with 32-Bit Types!';

    // LR: Percentage
    if (v2 instanceof NMLPercentResult)
      return percentageService.subtract(v1, v2);

    // LR: UoM
    if (v1 instanceof NMLUnitResult || v2 instanceof NMLUnitResult)
      return unitService.subtract(v1, v2);

    // LR: Currency
    if (v1 instanceof NMLCurrencyResult || v2 instanceof NMLCurrencyResult)
      return currencyService.subtract(v1, v2);

    // LR: Hex 32-Bit
    if (v1 instanceof NMLHexResult || v2 instanceof NMLHexResult)
      return hexService.subtract(v1, v2);

    return new NMLComputedResult(v1.value - v2.value);
  };

  multiply = (v1, v2) => {
    // LR: Hex 64-Bit
    if (v1 instanceof NMLHex64Result && v2 instanceof NMLHex64Result)
      return hexService.multiply64(v1, v2);

    if (v1 instanceof NMLHex64Result || v2 instanceof NMLHex64Result)
      throw 'You cannot mix 64-Bit with 32-Bit Types!';

    // LR: Percentages
    if (v2 instanceof NMLPercentResult)
      return percentageService.multiply(v1, v2);

    // LR: UoM
    if (v1 instanceof NMLUnitResult || v2 instanceof NMLUnitResult)
      return unitService.multiply(v1, v2);

    // LR: Currency
    if (v1 instanceof NMLCurrencyResult || v2 instanceof NMLCurrencyResult)
      return currencyService.multiply(v1, v2);

    // LR: Hex 32-Bit
    if (v1 instanceof NMLHexResult || v2 instanceof NMLHexResult)
      return hexService.multiply(v1, v2);

    return new NMLComputedResult(v1.value * v2.value);
  };

  divide = (v1, v2) => {
    // LR: Hex 64-Bit
    if (v1 instanceof NMLHex64Result && v2 instanceof NMLHex64Result)
      return hexService.divide64(v1, v2);

    if (v1 instanceof NMLHex64Result || v2 instanceof NMLHex64Result)
      throw 'You cannot mix 64-Bit with 32-Bit Types!';

    // LR: Percentages
    if (v2 instanceof NMLPercentResult) return percentageService.divide(v1, v2);

    // LR: UoM
    if (v1 instanceof NMLUnitResult || v2 instanceof NMLUnitResult)
      return unitService.divide(v1, v2);

    // LR: Currency
    if (v1 instanceof NMLCurrencyResult || v2 instanceof NMLCurrencyResult)
      return currencyService.divide(v1, v2);

    // LR: Hex 32-bit
    if (v1 instanceof NMLHexResult || v2 instanceof NMLHexResult)
      return hexService.divide(v1, v2);

    return new NMLComputedResult(v1.value / v2.value);
  };

  exponent = (v, exponent) => {
    // LR: Hex 32/64-Bit
    if (v instanceof NMLHex64Result)
      throw 'You cannot mix 64-Bit with 32-Bit Types!';

    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.exponent(v, exponent);

    // LR: Currency
    if (v instanceof NMLCurrencyResult)
      return currencyService.exponent(v, exponent);

    // LR: Hex
    if (v1 instanceof NMLHexResult)
      return hexService.exponent(v, exponent);

    return new NMLComputedResult(Math.pow(v.value, exponent));
  };

  sin = v => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.sin(v);

    // LR: Currency
    if (v instanceof NMLCurrencyResult) return currencyService.sin(v);

    return new NMLComputedResult(Math.sin(v.value));
  };

  cos = v => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.cos(v);

    // LR: Currency
    if (v instanceof NMLCurrencyResult) return currencyService.cos(v);

    return new NMLComputedResult(Math.cos(v.value));
  };

  tan = v => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.tan(v);

    // LR: Currency
    if (v instanceof NMLCurrencyResult) return currencyService.tan(v);

    return new NMLComputedResult(Math.tan(v.value));
  };

  asin = v => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.asin(v);

    // LR: Currency
    if (v instanceof NMLCurrencyResult) return currencyService.asin(v);

    return new NMLComputedResult(Math.asin(v.value));
  };

  acos = v => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.acos(v);

    // LR: Currency
    if (v instanceof NMLCurrencyResult) return currencyService.acos(v);

    return new NMLComputedResult(Math.acos(v.value));
  };

  atan = v => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.cos(atan);

    // LR: Currency
    if (v instanceof NMLCurrencyResult) return currencyService.atan(v);

    return new NMLComputedResult(Math.atan(v.value));
  };

  sqrt = v => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.sqrt(v);

    // LR: Currency
    if (v instanceof NMLCurrencyResult) return currencyService.sqrt(v);

    return new NMLComputedResult(Math.sqrt(v.value));
  };

  logarithm = v => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.logarithm(v);

    // LR: Currency
    if (v instanceof NMLCurrencyResult) return currencyService.logarithm(v);

    return new NMLComputedResult(Math.log(v.value));
  };

  // PercentService
  percentOf = (v, population) => {
    return percentageService.percentOf(v, population);
  };

  percentIncrease = (v, percent) => {
    return percentageService.percentIncrease(v, percent);
  };

  percentDecrease = (v, percent) => {
    return percentageService.percentDecrease(v, percent);
  }

  // UnitService
  unitConversion = (a, b) => {
    const conversionValue = unitService.convert(a.value, a.getUnit(), b.value);
    return new NMLUnitResult(conversionValue, b);
  };

  // CurrencyService
  currencyConversion = (a, b) => {
    const conversionValue = currencyService.convert(
      a.value,
      a.getCurrencyCode(),
      b.value
    );
    return new NMLCurrencyResult(conversionValue, b);
  };

  // Hex Service
  bitwiseShiftRight = (hex, bits) => {
    // LR: Hex 64-Bit
    if (hex instanceof NMLHex64Result)
      return hexService.bitwiseShiftRight64(hex, bits);

    // LR: Hex 32-Bit
    return hexService.bitwiseShiftRight(hex, bits);
  }

  bitwiseShiftLeft = (hex, bits) => {
    // LR: Hex 64-Bit
    if (hex instanceof NMLHex64Result)
      return hexService.bitwiseShiftLeft64(hex, bits);

    // LR: Hex 32-Bit
    return hexService.bitwiseShiftLeft(hex, bits);
  }

  bitwiseShiftRightUnsigned = (hex, bits) => {
    // LR: Hex 64-Bit
    if (hex instanceof NMLHex64Result)
      throw 'You cannot mix 64-Bit with 32-Bit Types!';

    return hexService.bitwiseShiftRightUnsigned(hex, bits);
  }
}

const ast = new AST();
export default ast;
