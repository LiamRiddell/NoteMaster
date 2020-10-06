const NMLBaseResult = require('./nml-base-result');

class NMLComputedResult extends NMLBaseResult {
  constructor(value) {
    super(value, null);
  }

  prettify() {
    // Omit NaN Results
    if (isNaN(this.value) || isNaN(this.unitValue))
      return null;

    const thousandSepratedValue = Number(this.unitValue).toLocaleString();
    return String(`${thousandSepratedValue}`);
  }
}

module.exports = NMLComputedResult;
