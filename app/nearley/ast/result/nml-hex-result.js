const NMLBaseResult = require("./nml-base-result");

class NMLHexResult extends NMLBaseResult {
    prettify() {
        return String(`${this.decimalToPaddedHexString(this.unitValue, 32)}`);
    }

    numHex(s) {
        var a = s.toString(16);
        if ((a.length % 2) > 0) {
            a = "0" + a;
        }
        return a;
    }
    // Combine with  BigInt(hugeNumber) for 64-bit support?
    decimalToPaddedHexString(number, bitsize) {
        let byteCount = Math.ceil(bitsize / 8);
        let maxBinValue = Math.pow(2, bitsize) - 1;

        /* In node.js this function fails for bitsize above 32bits */
        if (bitsize > 32)
            throw "number above maximum value";

        /* Conversion to unsigned form based on  */
        if (number < 0)
            number = maxBinValue + number + 1;

        return "0x" + (number >>> 0).toString(16).toUpperCase().padStart(byteCount * 2, '0');
    }
}

module.exports = NMLHexResult;