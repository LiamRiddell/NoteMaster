/* eslint-disable consistent-return */
// LR: Currency Result
// https://www.npmjs.com/package/convert-units
const convert = require('convert-units');
const NMLUnitResult = require('../result/nml-unit-result');
const NMLCurrencyResult = require('../result/nml-currency-result');

class UnitService {
  convert = (value, fromMetric, toMetric) => {
    return convert(value)
      .from(fromMetric)
      .to(toMetric);
  };

  add = (v1, v2) => {
    // LR: Both are a UoM
    if (v1 instanceof NMLUnitResult && v2 instanceof NMLUnitResult) {
      const [v1Standardised, v2Standardised] = this.standardizeUnits(v1, v2);
      return new NMLUnitResult(v1Standardised + v2Standardised, v1.unitToken);
    }

    // LR: We'll use whichever value, which type is a unit, as the base unit to add too.
    if (v1 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value + v2.value, v1.unitToken);
    }

    if (v2 instanceof NMLCurrencyResult) {
      return new NMLUnitResult(v1.value + v2.value, v2.unitToken);
    }
  };

  subtract = (v1, v2) => {
    // LR: Both are UoM
    if (v1 instanceof NMLUnitResult && v2 instanceof NMLUnitResult) {
      const [v1Standardised, v2Standardised] = this.standardizeUnits(v1, v2);
      return new NMLUnitResult(v1Standardised - v2Standardised, v1.unitToken);
    }

    // LR: We'll use whichever value, which type is a unit, as the base unit to add too.
    if (v1 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value - v2.value, v1.unitToken);
    }
    if (v2 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value - v2.value, v2.unitToken);
    }
  };

  multiply = (v1, v2) => {
    // LR: Both are UoM
    if (v1 instanceof NMLUnitResult && v2 instanceof NMLUnitResult) {
      const [v1Standardised, v2Standardised] = this.standardizeUnits(v1, v2);
      return new NMLUnitResult(v1Standardised * v2Standardised, v1.unitToken);
    }

    // LR: We'll use whichever value, which type is a unit, as the base unit to add too.
    if (v1 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value * v2.value, v1.unitToken);
    }

    if (v2 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value * v2.value, v2.unitToken);
    }
  };

  divide = (v1, v2) => {
    // LR: Both are UoM
    if (v1 instanceof NMLUnitResult && v2 instanceof NMLUnitResult) {
      const [v1Standardised, v2Standardised] = this.standardizeUnits(v1, v2);
      return new NMLUnitResult(v1Standardised / v2Standardised, v1.unitToken);
    }

    // LR: We'll use whichever value, which type is a unit, as the base unit to add too.
    if (v1 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value / v2.value, v1.unitToken);
    }

    if (v2 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value / v2.value, v2.unitToken);
    }
  };

  modulo = (v1, v2) => {
    // LR: Both are UoM
    if (v1 instanceof NMLUnitResult && v2 instanceof NMLUnitResult) {
      const [v1Standardised, v2Standardised] = this.standardizeUnits(v1, v2);
      return new NMLUnitResult(v1Standardised % v2Standardised, v1.unitToken);
    }

    // LR: We'll use whichever value, which type is a unit, as the base unit to add too.
    if (v1 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value % v2.value, v1.unitToken);
    }

    if (v2 instanceof NMLUnitResult) {
      return new NMLUnitResult(v1.value % v2.value, v2.unitToken);
    }
  };

  exponent = (v, exponent) => {
    return new NMLUnitResult(v.value ** exponent.value, v.unitToken);
  };

  sin = v => {
    return new NMLUnitResult(Math.sin(v.value), v.unitToken);
  };

  cos = v => {
    return new NMLUnitResult(Math.cos(v.value), v.unitToken);
  };

  tan = v => {
    return new NMLUnitResult(Math.tan(v.value), v.unitToken);
  };

  asin = v => {
    return new NMLUnitResult(Math.asin(v.value), v.unitToken);
  };

  acos = v => {
    return new NMLUnitResult(Math.acos(v.value), v.unitToken);
  };

  atan = v => {
    return new NMLUnitResult(Math.atan(v.value), v.unitToken);
  };

  sqrt = v => {
    return new NMLUnitResult(Math.sqrt(v.value), v.unitToken);
  };

  logarithm = v => {
    return new NMLUnitResult(Math.log(v.value), v.unitToken);
  };

  // If required converts the right unit to the left operand unit
  standardizeUnits = (unitA, unitB) => {
    const leftUnit = unitA.getUnit();
    const rightUnit = unitB.getUnit();

    // LR: Both currencies are the same
    if (leftUnit === rightUnit) return [unitA.value, unitB.value];

    // LR: If the units are different then we need to convert the right unit
    const v2ConvertedValue = this.convert(unitB.value, rightUnit, leftUnit);

    // LR: Return the standardised values
    return [unitA.value, v2ConvertedValue];
  };
}

const unitService = new UnitService();

// Default Export
module.exports = unitService;
