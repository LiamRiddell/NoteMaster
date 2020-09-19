const NMLBaseResult = require('./nml-base-result');

class NMLComputedResult extends NMLBaseResult {
  constructor(value) {
    super(value, null);
  }

  prettify() {
    const thousandSepratedValue = Number(this.unitValue).toLocaleString();
    return String(`${thousandSepratedValue}`);
  }
}

module.exports = NMLComputedResult;
