const Long = require('long');

// Result Types
const NMLBaseResult = require('../result/nml-base-result');
const NMLNumberResult = require('../result/nml-number-result');
const NMLUnitResult = require('../result/nml-unit-result');
const NMLCurrencyResult = require('../result/nml-currency-result');
const NMLComputedResult = require('../result/nml-computed-result');
const NMLPercentResult = require('../result/nml-percent-result');
const NMLHexResult = require('../result/nml-hex-result');
const NMLHex64Result = require('../result/nml-hex64-result');

class HexService {
    // 32-Bit
    // NOTE: We have move ability with 32-Bit since it can be handled in native javascript.
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

    // 64-Bit
    // Unfortunately, for now, we can only add 64-Bit use operators other 64-Bit valies
    add64 = (v1, v2) => new NMLHex64Result(v1.value.add(v2.value), v1.unitToken);
    subtract64 = (v1, v2) => new NMLHex64Result(v1.value.subtract(v2.value), v1.unitToken);
    multiply64 = (v1, v2) => new NMLHex64Result(v1.value.multiply(v2.value), v1.unitToken);
    divide64 = (v1, v2) => new NMLHex64Result(v1.value.divide(v2.value), v1.unitToken);
    bitwiseShiftLeft64 = (v1, bytes) => new NMLHex64Result(v1.value.shiftLeft(bytes.value), v1.unitToken);
    bitwiseShiftRight64 = (v1, bytes) => new NMLHex64Result(v1.value.shiftRight(bytes.value), v1.unitToken);

}

const hexService = new HexService();

// Default Export
module.exports = hexService;
