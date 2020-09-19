/* eslint-disable no-underscore-dangle */
/* eslint-disable default-case */
const NMLBaseResult = require('./nml-base-result');

class NMLCurrencyResult extends NMLBaseResult {
  prettify() {
    if (this.unitToken.type === 'currencyCode')
      return this._prettifyCurrencyCode();

    return this._prettifyCurrencySymbol();
  }

  getCurrencyCode = () => {
    switch (this.unitToken.type) {
      case 'currencyCode':
        return this.unitToken.value;

      case 'currencySymbol':
        switch (this.unitToken.value) {
          case '$':
            return 'USD';
          case '£':
            return 'GBP';
          case '€':
            return 'EUR';
        }
        break;
    }
  };

  _prettifyCurrencyCode() {
    const thousandSepratedValue = Number(this.unitValue).toLocaleString();

    switch (this.unitToken.value) {
      case 'GBP':
        return String(`£${thousandSepratedValue}`);
      case 'USD':
        return String(`$${thousandSepratedValue}`);
      case 'EUR':
        return String(`€${thousandSepratedValue}`);
    }

    return String(`${thousandSepratedValue} ${this.unitToken.value}`);
  }

  _prettifyCurrencySymbol() {
    const thousandSepratedValue = Number(this.unitValue).toLocaleString();
    return String(`${this.unitToken.value}${thousandSepratedValue}`);
  }
}

module.exports = NMLCurrencyResult;
