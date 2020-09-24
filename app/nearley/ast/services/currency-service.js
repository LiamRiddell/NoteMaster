/* eslint-disable consistent-return */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
// LR: Axios
const axios = require('axios');

// https://www.npmjs.com/package/money
const fx = require('money');

// LR: Currency Result
const NMLCurrencyResult = require('../result/nml-currency-result');

// LR: Redux Store
const { store } = require('../../../store/store');

class CurrencyService {
  lastUpdate = null;

  refreshInterval = 10 * 60 * 1000;

  baseCurrency = 'USD'

  constructor() {
    // LR: Get the state from redux
    const state = store.getState();

    // LR: Set the base currency
    this.baseCurrency = state.preferences.nmlBaseCurrency;

    // LR: Get the exchange rates relative to base currency
    this.getExchangeRates();
  }

  getExchangeRates = callback => {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.baseCurrency}`)
      .then(response => {
        fx.base = response.data.base;
        fx.rates = response.data.rates;
        this.lastUpdate = Date.now();

        // eslint-disable-next-line promise/no-callback-in-promise
        if (typeof callback === 'function') callback();
      });
  };

  convert = (value, fromMetric, toMetric) => {
    // LR: Get the current currency from preferences
    const preferencesBaseCurrency = store.getState().preferences.nmlBaseCurrency;
    const baseCurrencyChanged = this.baseCurrency !== preferencesBaseCurrency;

    if (
      this.lastUpdate === null ||
      Date.now() - this.lastUpdate < this.refreshInterval || // LR: More than 10 minutes old
      baseCurrencyChanged
    ) {

      // LR: Update the internal currency
      this.baseCurrency = preferencesBaseCurrency;

      // LR: Update exchange rates
      this.getExchangeRates(() => {
        return fx(value)
          .from(fromMetric)
          .to(toMetric);
      });
    }

    // LR: Return the converted value
    return fx(value)
      .from(fromMetric)
      .to(toMetric);
  };

  add = (v1, v2) => {
    // LR: Both are currencies
    if (v1 instanceof NMLCurrencyResult && v2 instanceof NMLCurrencyResult) {
      const [v1Standardised, v2Standardised] = this.standardizeCurrencies(
        v1,
        v2
      );
      return new NMLCurrencyResult(
        v1Standardised + v2Standardised,
        v1.unitToken
      );
    }

    // LR: We'll use whichever value, which type is a currency, as the base currency to add too.
    // TODO: Not working
    if (v1 instanceof NMLCurrencyResult) {
      return new NMLCurrencyResult(v1.value + v2.value, v1.unitToken);
    }

    if (v2 instanceof NMLCurrencyResult) {
      return new NMLCurrencyResult(v1.value + v2.value, v2.unitToken);
    }
  };

  subtract = (v1, v2) => {
    // LR: Both are currencies
    if (v1 instanceof NMLCurrencyResult && v2 instanceof NMLCurrencyResult) {
      const [v1Standardised, v2Standardised] = this.standardizeCurrencies(
        v1,
        v2
      );
      return new NMLCurrencyResult(
        v1Standardised - v2Standardised,
        v1.unitToken
      );
    }

    // LR: We'll use whichever value, which type is a currency, as the base currency to add too.
    if (v1 instanceof NMLCurrencyResult) {
      return new NMLCurrencyResult(v1.value - v2.value, v1.unitToken);
    }

    if (v2 instanceof NMLCurrencyResult) {
      return new NMLCurrencyResult(v1.value - v2.value, v2.unitToken);
    }
  };

  multiply = (v1, v2) => {
    // LR: Both are currencies
    if (v1 instanceof NMLCurrencyResult && v2 instanceof NMLCurrencyResult) {
      const [v1Standardised, v2Standardised] = this.standardizeCurrencies(
        v1,
        v2
      );
      return new NMLCurrencyResult(
        v1Standardised * v2Standardised,
        v1.unitToken
      );
    }

    // LR: We'll use whichever value, which type is a currency, as the base currency to add too.
    if (v1 instanceof NMLCurrencyResult) {
      return new NMLCurrencyResult(v1.value * v2.value, v1.unitToken);
    }

    if (v2 instanceof NMLCurrencyResult) {
      return new NMLCurrencyResult(v1.value * v2.value, v2.unitToken);
    }
  }

  divide = (v1, v2) => {
    // LR: Both are currencies
    if (v1 instanceof NMLCurrencyResult && v2 instanceof NMLCurrencyResult) {
      const [v1Standardised, v2Standardised] = this.standardizeCurrencies(
        v1,
        v2
      );
      return new NMLCurrencyResult(
        v1Standardised / v2Standardised,
        v1.unitToken
      );
    }

    // LR: We'll use whichever value, which type is a currency, as the base currency to add too.
    if (v1 instanceof NMLCurrencyResult) {
      return new NMLCurrencyResult(v1.value / v2.value, v1.unitToken);
    }

    if (v2 instanceof NMLCurrencyResult) {
      return new NMLCurrencyResult(v1.value / v2.value, v2.unitToken);
    }
  };

  exponent = (v, exponent) => {
    return new NMLCurrencyResult(v.value ** exponent, v.unitToken);
  };

  sin = v => {
    return new NMLCurrencyResult(Math.sin(v.value), v.unitToken);
  };

  cos = v => {
    return new NMLCurrencyResult(Math.cos(v.value), v.unitToken);
  };

  tan = v => {
    return new NMLCurrencyResult(Math.tan(v.value), v.unitToken);
  };

  asin = v => {
    return new NMLCurrencyResult(Math.asin(v.value), v.unitToken);
  };

  acos = v => {
    return new NMLCurrencyResult(Math.acos(v.value), v.unitToken);
  };

  atan = v => {
    return new NMLCurrencyResult(Math.atan(v.value), v.unitToken);
  };

  sqrt = v => {
    return new NMLCurrencyResult(Math.sqrt(v.value), v.unitToken);
  };

  logarithm = v => {
    return new NMLCurrencyResult(Math.log(v.value), v.unitToken);
  };

  // If required converts the right currency to the left operand currency
  standardizeCurrencies = (currencyA, currencyB) => {
    const leftCurrencyCode = currencyA.getCurrencyCode();
    const rightCurrencyCode = currencyB.getCurrencyCode();

    // LR: Both currencies are the same
    if (leftCurrencyCode === rightCurrencyCode)
      return [currencyA.value, currencyB.value];

    // LR: If the currencies are different then we need to convert the right currency
    const v2ConvertedValue = this.convert(
      currencyB.value,
      rightCurrencyCode,
      leftCurrencyCode
    );

    // LR: Return the standardised values
    return [currencyA.value, v2ConvertedValue];
  };
}

const currencyService = new CurrencyService();

// Default Export
module.exports = currencyService;
