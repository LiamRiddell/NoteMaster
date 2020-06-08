/* eslint-disable import/prefer-default-export */
export const debounce = (func, delay) => {
  let inDebounce;
  // eslint-disable-next-line func-names
  return function() {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  // eslint-disable-next-line func-names
  return function() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      // eslint-disable-next-line func-names
      setTimeout(function() {
        inThrottle = false;
      }, limit);
    }
  };
};
