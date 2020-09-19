/* eslint-disable valid-typeof */
/* eslint-disable class-methods-use-this */
// Result Types
const NMLNumberResult = require('./result/nml-number-result');
const NMLUnitResult = require('./result/nml-unit-result');
const NMLCurrencyResult = require('./result/nml-currency-result');
const NMLComputedResult = require('./result/nml-computed-result');
const NMLPercentResult = require('./result/nml-percent-result');

// Services
const unitService = require('./services/unit-service');
const currencyService = require('./services/currency-service');
const percentageService = require('./services/percentage-service');

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

  // PEMDAS
  add = (v1, v2) => {
    // LR: Percentage
    if (v2 instanceof NMLPercentResult) return percentageService.add(v1, v2);

    // LR: UoM
    if (v1 instanceof NMLUnitResult || v2 instanceof NMLUnitResult)
      return unitService.add(v1, v2);

    // LR: Currency
    if (v1 instanceof NMLCurrencyResult || v2 instanceof NMLCurrencyResult)
      return currencyService.add(v1, v2);

    // LR: Default
    return new NMLComputedResult(v1.value + v2.value);
  };

  subtract = (v1, v2) => {
    // LR: Percentage
    if (v2 instanceof NMLPercentResult)
      return percentageService.subtract(v1, v2);

    // LR: UoM
    if (v1 instanceof NMLUnitResult || v2 instanceof NMLUnitResult)
      return unitService.subtract(v1, v2);

    // LR: Currency
    if (v1 instanceof NMLCurrencyResult && v2 instanceof NMLCurrencyResult)
      return currencyService.subtract(v1, v2);

    return new NMLComputedResult(v1.value - v2.value);
  };

  multiply = (v1, v2) => {
    // LR: Percentages
    if (v2 instanceof NMLPercentResult)
      return percentageService.multiply(v1, v2);

    // LR: UoM
    if (v1 instanceof NMLUnitResult || v2 instanceof NMLUnitResult)
      return unitService.multiply(v1, v2);

    // LR: Currency
    if (v1 instanceof NMLCurrencyResult && v2 instanceof NMLCurrencyResult)
      return currencyService.multiply(v1, v2);

    return new NMLComputedResult(v1.value * v2.value);
  };

  divide = (v1, v2) => {
    // LR: Percentages
    if (v2 instanceof NMLPercentResult) return percentageService.divide(v1, v2);

    // LR: UoM
    if (v1 instanceof NMLUnitResult || v2 instanceof NMLUnitResult)
      return unitService.divide(v1, v2);

    // LR: Currency
    if (v1 instanceof NMLCurrencyResult || v2 instanceof NMLCurrencyResult)
      return currencyService.divide(v1, v2);

    return new NMLComputedResult(v1.value / v2.value);
  };

  exponent = (v, exponent) => {
    // LR: UoM
    if (v instanceof NMLUnitResult) return unitService.exponent(v, exponent);

    // LR: Currency
    if (v instanceof NMLCurrencyResult)
      return currencyService.exponent(v, exponent);

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
}

const ast = new AST();
export default ast;
