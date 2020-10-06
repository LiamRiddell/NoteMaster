// LR: The returned structure from the parsing process.
class NMLBaseResult {
  value;

  unitToken;

  unitValue;

  constructor(value, unitToken) {
    this.value = value;
    this.unitToken = unitToken;

    if (typeof value === 'number') {
      const strValue = String(this.value);

      // LR: Set to integer
      this.unitValue = parseFloat(strValue).toFixed(0);

      // LR: Only try decimals longer than 8 decimal places
      if (String(strValue).indexOf('.') > -1) {
        const decimalLength = strValue.split('.')[1].length;

        if (decimalLength < 8) this.unitValue = parseFloat(strValue);
        else this.unitValue = parseFloat(strValue).toFixed(8);
      }
    } else {
      this.unitValue = this.value;
    }
  }
}

module.exports = NMLBaseResult;
