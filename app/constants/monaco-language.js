const NOTEMASTER_LANGUAGE = {
  tokenizer: {
    root: [
      [/^#.*?$/, 'comment'],
      [/^\/\/.*?$/, 'comment'],
      [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        'link'
      ],
      [
        /(?:[0-2][0-9]|(?:3)[0-1])(?:\/)(?:(?:(?:0)[0-9])|(?:(?:1)[0-2]))(?:\/)\d{4}/,
        'date'
      ],
      [/0[xX][0-9a-fA-F]+/, 'hex'],
      [/(?: ^\+|-?)(?:[1-9]\d{0,4}|0|)\.\d /, 'decimal'],
      [/(?: [+|-]\d+ )/, 'integer'],
      [/(?: \d+ )/, 'integer'],
      [/(?:\d+%)/, 'percent'],
      [
        /AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BRL|BSD|BTN|BWP|BYR|BZD|CAD|CDF|CHF|CLP|CNY|COP|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GGP|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|IMP|INR|IQD|IRR|ISK|JEP|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRO|MUR|MVR|MWK|MXN|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SPL|SRD|STD|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TVD|TWD|TZS|UAH|UGX|USD|UYU|UZS|VEF|VND|VUV|WST|XAF|XCD|XDR|XOF|XPF|YER|ZAR|ZMW|ZWD/,
        'currency'
      ],
      [/`.*?`/, 'keyword']
    ]
  }
};

export default NOTEMASTER_LANGUAGE;
