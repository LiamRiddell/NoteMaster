// Result Types
const NMLBaseResult = require('../result/nml-base-result');
const NMLNumberResult = require('../result/nml-number-result');
const NMLUnitResult = require('../result/nml-unit-result');
const NMLCurrencyResult = require('../result/nml-currency-result');
const NMLComputedResult = require('../result/nml-computed-result');
const NMLPercentResult = require('../result/nml-percent-result');
const NMLHexResult = require('../result/nml-hex-result');

class HexService {
    add = (v1, v2) => {
        // LR: UoM
        if (v1 instanceof NMLUnitResult)
            return new NMLUnitResult(v1.value + v2.value, v1.unitToken);

        // LR: Currency
        if (v1 instanceof NMLCurrencyResult)
            return new NMLCurrencyResult(v1.value + v2.value, v1.unitToken);

        return new NMLHexResult(v1.value + v2.value);
    }

    subtract = (v1, v2) => {
        // LR: UoM
        if (v1 instanceof NMLUnitResult)
            return new NMLUnitResult(v1.value - v2.value, v1.unitToken);

        // LR: Currency
        if (v1 instanceof NMLCurrencyResult)
            return new NMLCurrencyResult(v1.value - v2.value, v1.unitToken);

        return new NMLHexResult(v1.value - v2.value);
    }

    multiply = (v1, v2) => {
        // LR: UoM
        if (v1 instanceof NMLUnitResult)
            return new NMLUnitResult(v1.value * v2.value, v1.unitToken);

        // LR: Currency
        if (v1 instanceof NMLCurrencyResult)
            return new NMLCurrencyResult(v1.value * v2.value, v1.unitToken);

        return new NMLHexResult(v1.value * v2.value);
    }

    divide = (v1, v2) => {
        // LR: UoM
        if (v1 instanceof NMLUnitResult)
            return new NMLUnitResult(v1.value / v2.value, v1.unitToken);

        // LR: Currency
        if (v1 instanceof NMLCurrencyResult)
            return new NMLCurrencyResult(v1.value / v2.value, v1.unitToken);

        return new NMLHexResult(v1.value / v2.value);
    }

    exponent = (v, exponent) => {
        return new NMLHexResult(v.value ** exponent.value);
    }

    bitwiseShiftRight = (hex, bits) => {
        return new NMLHexResult(hex.value >> bits.value);
    }

    bitwiseShiftLeft = (hex, bits) => {
        return new NMLHexResult(hex.value << bits.value);
    }

    bitwiseShiftRightUnsigned = (hex, bits) => {
        return new NMLHexResult(hex.value >>> bits.value);
    }
}

const hexService = new HexService();

// Default Export
module.exports = hexService;