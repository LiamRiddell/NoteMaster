const Long = require("long");
const NMLBaseResult = require("./nml-base-result");

class NMLHex64Result extends NMLBaseResult {
    prettify() {
        return String(`${this.decimalToPaddedHex64String(this.unitValue)}`);
    }


    // Combine with  BigInt(hugeNumber) for 64-bit support?
    decimalToPaddedHex64String(long) {
        return "0x" + long.toString(16).toUpperCase().padStart(8 * 2, '0');
    }
}

module.exports = NMLHex64Result;
