const NMLBaseResult = require('./nml-base-result');

class NMLPercentResult extends NMLBaseResult {
  prettify() {
    return String(`${this.unitValue.toLocaleString()}%`);
  }
}

module.exports = NMLPercentResult;
