const NMLBaseResult = require('./nml-base-result');

class NMLNumberResult extends NMLBaseResult {
  prettify() {
    // Omit NaN Results
    if (isNaN(this.value) || isNaN(this.unitValue))
      return null;

    return String(`${this.unitValue.toLocaleString()}`);
  }
}

module.exports = NMLNumberResult;
