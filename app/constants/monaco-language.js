const NOTEMASTER_LANGUAGE = {
  operators: [
    // '=',
    '>',
    '<',
    '!',
    '~',
    '?',
    ':',
    '==',
    '<=',
    '>=',
    '!=',
    '&&',
    '||',
    '++',
    '--',
    '+',
    '-',
    '*',
    '/',
    '&',
    '|',
    '^',
    '%',
    '<<',
    '>>',
    '>>>',
    '+=',
    '-=',
    '*=',
    '/=',
    '&=',
    '|=',
    '^=',
    '%=',
    '<<=',
    '>>=',
    '>>>='
  ],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*/^%]+/,
  uomToken: [
    // Length
    'millimeter',
    'millimeters',
    'mm',
    'centimeter',
    'centimeters',
    'cm',
    'inch',
    'inches',
    'in',
    'ft-us',
    'ft',
    'mi',
    // Area
    'mm2',
    'cm2',
    'm2',
    'ha',
    'km2',
    'in2',
    'ft2',
    'ac',
    'mi2',
    // Mass
    'mcg',
    'mg',
    'kg',
    'oz',
    'lb',
    'mt',
    // Volume
    'mm3',
    'cm3',
    'ml',
    'kl',
    'm3',
    'km3',
    'tsp',
    'Tbs',
    'in3',
    'fl-oz',
    'cup',
    'pnt',
    'qt',
    'gal',
    'ft3',
    'yd3',
    // Volume Flow Rate
    'mm3/s',
    'cm3/s',
    'ml/s',
    'cl/s',
    'dl/s',
    'l/s',
    'l/min',
    'l/h',
    'kl/s',
    'kl/min',
    'kl/h',
    'm3/s',
    'm3/min',
    'm3/h',
    'km3/s',
    'tsp/s',
    'Tbs/s',
    'in3/s',
    'in3/min',
    'in3/h',
    'fl-oz/s',
    'fl-oz/min',
    'fl-oz/h',
    'cup/s',
    'pnt/s',
    'pnt/min',
    'pnt/h',
    'qt/s',
    'gal/s',
    'gal/min',
    'gal/h',
    'ft3/s',
    'ft3/min',
    'ft3/h',
    'yd3/s',
    'yd3/min',
    'yd3/h',
    // Time
    'ns',
    'mu',
    'ms',
    'min',
    'week',
    'month',
    'year',
    // Frequency
    'Hz',
    'mHz',
    'kHz',
    'MHz',
    'GHz',
    'THz',
    'rpm',
    'deg/s',
    'rad/s',
    // Speed
    'm/s',
    'km/h',
    'm/h',
    'knot',
    'ft/s',
    // Pace
    's/m',
    'min/km',
    's/ft',
    'min/ft',
    // Pressure
    'Pa',
    'hPa',
    'kPa',
    'MPa',
    'bar',
    'torr',
    'psi',
    'ksi',
    // Digital
    'Kb',
    'Mb',
    'Gb',
    'Tb',
    'KB',
    'MB',
    'GB',
    'TB',
    // Illuminance
    'lx',
    'ft-cd',
    // Parts-per
    'ppm',
    'ppb',
    'ppt',
    'ppq',
    // Voltage
    'mV',
    'kV',
    // Current
    'mA',
    'kA',
    // Power
    'mW',
    'kW',
    'MW',
    'GW',
    // Apparent Power
    'VA',
    'mVA',
    'kVA',
    'MVA',
    'GVA',
    // Reactive Power
    'VAR',
    'mVAR',
    'kVAR',
    'MVAR',
    'GVAR',
    // Energy
    'Wh',
    'mWh',
    'kWh',
    'MWh',
    'GWh',
    // Reactive Energy
    'VARh',
    'mVARh',
    'kVARh',
    'MVARh',
    'GVARh',
    // Angle
    'deg',
    'rad',
    'grad',
    'arcmin',
    'arcsec',
    /// Single letters last so they aren't greedy
    // Area
    'meter',
    'meters',
    'm',
    // Mass
    'g',
    't',
    // Volume
    'l',
    // Temperature
    'C',
    'F',
    'K',
    'R',
    // Time
    's',
    'h',
    'd',
    // Digital
    'b',
    'B',
    // Voltage
    'V',
    // Current
    'A',
    // Power
    'W',
    // Energy
    'J',
    'kJ'
  ],
  tokenizer: {
    root: [
      // Format
      { include: '@format' },

      // Data Types
      { include: '@dataTypes' },

      // Operators
      { include: '@operators' },

      // Constants
      { include: '@constants' },

      // Functions
      { include: '@functions' },

      // Keywords
      { include: '@keywords' },

      // Units
      [
        /AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BRL|BSD|BTN|BWP|BYR|BZD|CAD|CDF|CHF|CLP|CNY|COP|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GGP|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|IMP|INR|IQD|IRR|ISK|JEP|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRO|MUR|MVR|MWK|MXN|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SPL|SRD|STD|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TVD|TWD|TZS|UAH|UGX|USD|UYU|UZS|VEF|VND|VUV|WST|XAF|XCD|XDR|XOF|XPF|YER|ZAR|ZMW|ZWD/,
        'currency'
      ],
      [/[a-z_$][\w$]*/, { cases: { '@uomToken': 'unit' } }]
    ],
    format: [
      [/^#.*?$/, 'header'],
      [/^\/\/.*?$/, 'comment'],
      [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        'link'
      ],
      [/\$[a-zA-Z][a-zA-Z_0-9]*/, 'variable'],
      [/^[a-zA-Z][a-zA-Z_0-9]*\b:/, 'label'],
      [/`.*?`/, 'underline']
    ],
    dataTypes: [
      // [
      //   /(?:[0-2][0-9]|(?:3)[0-1])(?:\/)(?:(?:(?:0)[0-9])|(?:(?:1)[0-2]))(?:\/)\d{4}/,
      //   'date'
      // ],
      [/0[xX][0-9a-fA-F]+/, 'hex'],
      [/(?:[+|-]\d+%)/, 'percent'],
      [/(?:\d+%)/, 'percent'],
      [/(?:[+|-]\d+)/, 'integer'],
      [/(?:\b\d+\b)/, 'integer']
    ],
    operators: [
      [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }]
      // [/\+/, 'operator'],
      // [/-/, 'operator'],
      // [/\*/, 'operator'],
      // [/\//, 'operator'],
      // [/\^/, 'operator'],
      // [/<</, 'operator'],
      // [/>>/, 'operator'],
      // [/%/, 'operator']
    ],
    constants: [
      [/\b(?:Pi)\b/, 'constant'],
      [/\b(?:E)\b/, 'constant']
    ],
    functions: [
      [/\b(?:sin)\b/, 'function'],
      [/\b(?:cos)\b/, 'function'],
      [/\b(?:tan)\b/, 'function'],
      [/\b(?:asin)\b/, 'function'],
      [/\b(?:acos)\b/, 'function'],
      [/\b(?:atan)\b/, 'function']
    ],
    keywords: [
      // Conversion
      [/\b(?:as)\b/, 'keyword'],
      [/\b(?:to)\b/, 'keyword'],
      [/\b(?:in)\b/, 'keyword'],
      // Percentages
      [/\b(?:by)\b/, 'keyword'],
      [/\b(?:of)\b/, 'keyword'],
      [/\b(?:increase)\b/, 'keyword'],
      [/\b(?:decrease)\b/, 'keyword']
    ]
  }
};

export default NOTEMASTER_LANGUAGE;
