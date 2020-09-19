const NMLBaseResult = require('./nml-base-result');

class NMLUnitResult extends NMLBaseResult {
  prettify() {
    const thousandSepratedValue = Number(this.unitValue).toLocaleString();
    return String(`${thousandSepratedValue}${this.unitToken.value}`);
  }

  getUnit = () => this.unitToken.value;
}

module.exports = NMLUnitResult;
