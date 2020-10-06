/* eslint-disable no-throw-literal */
// Result Types
const NMLUnitResult = require('../result/nml-unit-result');
const NMLCurrencyResult = require('../result/nml-currency-result');
const NMLComputedResult = require('../result/nml-computed-result');
const NMLPercentResult = require('../result/nml-percent-result');

class PercentageService {
  add = (v1, v2) => {
    if (v1 instanceof NMLPercentResult)
      throw 'The left operand can not be a percentage when adding';

    // Calculate the percentage of the population
    const percentageOfResult = this.percentOf(v2, v1);

    // LR: UoM
    if (percentageOfResult instanceof NMLUnitResult)
      return new NMLUnitResult(
        v1.value + percentageOfResult.value,
        percentageOfResult.unitToken
      );

    // LR: Currency
    if (percentageOfResult instanceof NMLCurrencyResult)
      return new NMLCurrencyResult(
        v1.value + percentageOfResult.value,
        percentageOfResult.unitToken
      );

    return new NMLComputedResult(v1.value + percentageOfResult.value);
  };

  subtract = (v1, v2) => {
    if (v1 instanceof NMLPercentResult)
      throw 'The left operand can not be a percentage when subtracting';

    // Calculate the percentage of the population
    const percentageOfResult = this.percentOf(v2, v1);

    // LR: UoM
    if (percentageOfResult instanceof NMLUnitResult)
      return new NMLUnitResult(
        v1.value - percentageOfResult.value,
        percentageOfResult.unitToken
      );

    // LR: Currency
    if (percentageOfResult instanceof NMLCurrencyResult)
      return new NMLCurrencyResult(
        v1.value - percentageOfResult.value,
        percentageOfResult.unitToken
      );

    return new NMLComputedResult(v1.value - percentageOfResult.value);
  };

  multiply = (v1, v2) => {
    if (v1 instanceof NMLPercentResult)
      throw 'The left operand can not be a percentage when multiplying';

    // Calculate the percentage of the population
    const percentageOfResult = this.percentOf(v2, v1);

    // LR: UoM
    if (percentageOfResult instanceof NMLUnitResult)
      return new NMLUnitResult(
        v1.value * percentageOfResult.value,
        percentageOfResult.unitToken
      );

    // LR: Currency
    if (percentageOfResult instanceof NMLCurrencyResult)
      return new NMLCurrencyResult(
        v1.value * percentageOfResult.value,
        percentageOfResult.unitToken
      );

    return new NMLComputedResult(v1.value * percentageOfResult.value);
  };

  divide = (v1, v2) => {
    if (v1 instanceof NMLPercentResult)
      throw 'The left operand can not be a percentage when dividing';

    // Calculate the percentage of the population
    const percentageOfResult = this.percentOf(v2, v1);

    // LR: UoM
    if (percentageOfResult instanceof NMLUnitResult)
      return new NMLUnitResult(
        v1.value / percentageOfResult.value,
        percentageOfResult.unitToken
      );

    // LR: Currency
    if (percentageOfResult instanceof NMLCurrencyResult)
      return new NMLCurrencyResult(
        v1.value / percentageOfResult.value,
        percentageOfResult.unitToken
      );

    return new NMLComputedResult(v1.value / percentageOfResult.value);
  };

  modulo = (v1, v2) => {
    if (v1 instanceof NMLPercentResult)
      throw 'The left operand can not be a percentage when modulos';

    // Calculate the percentage of the population
    const percentageOfResult = this.percentOf(v2, v1);

    // LR: UoM
    if (percentageOfResult instanceof NMLUnitResult)
      return new NMLUnitResult(
        v1.value % percentageOfResult.value,
        percentageOfResult.unitToken
      );

    // LR: Currency
    if (percentageOfResult instanceof NMLCurrencyResult)
      return new NMLCurrencyResult(
        v1.value % percentageOfResult.value,
        percentageOfResult.unitToken
      );

    return new NMLComputedResult(v1.value % percentageOfResult.value);
  }

  percentOf = (v, population) => {
    const percentageOfValue = (population.value / 100) * v.value;

    // LR: UoM
    if (population instanceof NMLUnitResult)
      return new NMLUnitResult(percentageOfValue, population.unitToken);

    // LR: Currency
    if (population instanceof NMLCurrencyResult)
      return new NMLCurrencyResult(percentageOfValue, population.unitToken);

    return new NMLComputedResult(percentageOfValue);
  };

  percentIncrease = (v, percent) => {
    const percentageOfValue = (v.value / 100) * percent.value;
    const percentageIncreaseValue = v.value + percentageOfValue;

    // LR: UoM
    if (v instanceof NMLUnitResult)
      return new NMLUnitResult(percentageIncreaseValue, v.unitToken);

    // LR: Currency
    if (v instanceof NMLCurrencyResult)
      return new NMLCurrencyResult(percentageIncreaseValue, v.unitToken);

    return new NMLComputedResult(percentageIncreaseValue);
  };

  percentDecrease = (v, percent) => {
    const percentageOfValue = (v.value / 100) * percent.value;
    const percentageIncreaseValue = v.value - percentageOfValue;

    // LR: UoM
    if (v instanceof NMLUnitResult)
      return new NMLUnitResult(percentageIncreaseValue, v.unitToken);

    // LR: Currency
    if (v instanceof NMLCurrencyResult)
      return new NMLCurrencyResult(percentageIncreaseValue, v.unitToken);

    return new NMLComputedResult(percentageIncreaseValue);
  };
}

const percentageService = new PercentageService();

// Default Export
module.exports = percentageService;
