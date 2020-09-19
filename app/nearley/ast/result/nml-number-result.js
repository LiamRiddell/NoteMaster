const NMLBaseResult = require('./nml-base-result');

class NMLNumberResult extends NMLBaseResult {
  prettify() {
    return String(`${this.unitValue.toLocaleString()}`);
  }
}

module.exports = NMLNumberResult;
