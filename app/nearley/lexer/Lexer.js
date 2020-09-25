import moo from 'moo';
import Long from 'long';
// Data Types
const dataTypes = {
  // Date - These will clash with number parsing. This is why it takes precedence
  // date: /(?:[0-2][0-9]|(?:3)[0-1])(?:\/)(?:(?:(?:0)[0-9])|(?:(?:1)[0-2]))(?:\/)\d{4}/,

  // Basic Types - Order of precedence
  hex64: {
    match: /0[xX][0-9a-fA-F]{9,16}/,
    lineBreaks: true,
    value: v => Long.fromString(v, 16)
  },
  hex32: {
    match: /0[xX][0-9a-fA-F]{1,8}/,
    lineBreaks: true,
    value: v => parseInt(v, 16) // 0xFF -> 255
  },
  decimal: {
    match: /(?:^\+|\-?)(?:[0-9]*\d)\.(?:[0-9]\d{0,8})/,
    lineBreaks: true,
    value: x => parseFloat(x) // "10.0" -> 10.0f
  },
  integer: {
    match: /(?:[+-]?)(?:\d+)/,
    lineBreaks: true,
    value: x => parseInt(x, 10)
  },
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  boolean: {
    match: ['true', 'false'],
    lineBreaks: true,
    value: x => x === 'true'
  }
};

// Operators
const operators = {
  add: ['+', 'add', 'plus'],
  subtract: ['-', 'subtract', 'minus'],
  multiply: ['*', 'x', 'multiply', 'times'],
  divide: ['/', 'divide'],
  exponent: ['^', 'power', 'exponent'],
  modulo: ['%', 'modulus', 'modulo', 'mod'],
  bitwiserightunsigned: ['>>>'],
  bitwiseleft: ['<<'],
  bitwiseright: ['>>'],
};

// Mathmatical Functions
const functions = {
  sin: 'sin',
  cos: 'cos',
  tan: 'tan',

  asin: 'asin',
  acos: 'acos',
  atan: 'atan',

  sqrt: 'sqrt',
  ln: 'ln'
};

// Constants
const constants = {
  pi: {
    match: 'Pi',
    value: v => Math.PI
  },
  e: {
    match: 'E',
    value: v => Math.E
  },
};

const unitsOfMeasurement = {
  // Length
  uom_mm: {
    match: [/(?:millimeters)\b/, /(?:millimeter)\b/, /(?:mm)\b/],
    value: () => 'mm'
  },
  uom_cm: {
    match: [/(?:centimeters)\b/, /(?:centimeter)\b/, /(?:cm)\b/],
    value: () => 'cm'
  },
  uom_in: {
    match: [/(?:inches)\b/, /(?:inch)\b/, /(?:in)\b/],
    value: () => 'in'
  },
  uom_ftus: {
    match: [/(?:ft-us)\b/],
    value: () => 'ft-us'
  },
  uom_ft: {
    match: [/(?:feet)\b/, /(?:foot)\b/, /(?:ft)\b/],
    value: () => 'ft'
  },
  uom_mi: {
    match: [/(?:miles)\b/, /(?:mile)\b/, /(?:mi)\b/],
    value: () => 'mi'
  },
  // Area
  uom_mm2: {
    match: [/(?:mm2)\b/],
    value: () => 'mm2'
  },
  uom_cm2: {
    match: [/(?:cm2)\b/],
    value: () => 'cm2'
  },
  uom_m2: {
    match: [/(?:m2)\b/],
    value: () => 'm2'
  },
  uom_ha: {
    match: [/(?:hectare)\b/, /(?:hectares)\b/, /(?:ha)\b/],
    value: () => 'ha'
  },
  uom_km2: {
    match: [/(?:km2)\b/],
    value: () => 'km2'
  },
  uom_in2: {
    match: [/(?:in2)\b/],
    value: () => 'in2'
  },
  uom_ft2: {
    match: [/(?:ft2)\b/],
    value: () => 'ft2'
  },
  uom_ac: {
    match: [/(?:ac)\b/],
    value: () => 'ac'
  },
  uom_mi2: {
    match: [/(?:mi2)\b/],
    value: () => 'mi2'
  },
  // Mass
  uom_mcg: {
    match: [/(?:mcg)\b/],
    value: () => 'mcg'
  },
  uom_mg: {
    match: [/(?:mg)\b/],
    value: () => 'mg'
  },
  uom_kg: {
    match: [/(?:kg)\b/],
    value: () => 'kg'
  },
  uom_oz: {
    match: [/(?:oz)\b/],
    value: () => 'oz'
  },
  uom_lb: {
    match: [/(?:lb)\b/],
    value: () => 'lb'
  },
  uom_mt: {
    match: [/(?:mt)\b/],
    value: () => 'mt'
  },
  // Volume
  uom_mm3: {
    match: [/(?:mm3)\b/],
    value: () => 'mm3'
  },
  uom_cm3: {
    match: [/(?:cm3)\b/],
    value: () => 'cm3'
  },
  uom_ml: {
    match: [/(?:ml)\b/],
    value: () => 'ml'
  },
  uom_kl: {
    match: [/(?:kl)\b/],
    value: () => 'kl'
  },
  uom_m3: {
    match: [/(?:m3)\b/],
    value: () => 'm3'
  },
  uom_km3: {
    match: [/(?:km3)\b/],
    value: () => 'km3'
  },
  uom_tsp: {
    match: [/(?:tsp)\b/],
    value: () => 'tsp'
  },
  uom_Tbs: {
    match: [/(?:Tbs)\b/],
    value: () => 'Tbs'
  },
  uom_in3: {
    match: [/(?:in3)\b/],
    value: () => 'in3'
  },
  uom_floz: {
    match: [/(?:fl-oz)\b/, /(?:floz)\b/],
    value: () => 'fl-oz'
  },
  uom_cup: {
    match: [/(?:cup)\b/],
    value: () => 'cup'
  },
  uom_pnt: {
    match: [/(?:pnt)\b/],
    value: () => 'pnt'
  },
  uom_qt: {
    match: [/(?:qt)\b/],
    value: () => 'qt'
  },
  uom_gal: {
    match: [/(?:gal)\b/],
    value: () => 'gal'
  },
  uom_ft3: {
    match: [/(?:ft3)\b/],
    value: () => 'ft3'
  },
  uom_yd3: {
    match: [/(?:yd3)\b/],
    value: () => 'yd3'
  },
  // Volume Flow Rate
  uom_mm3_s: {
    match: [/(?:mm3\/s)\b/],
    value: () => 'mm3/s'
  },
  uom_cm3_s: {
    match: [/(?:cm3\/s)\b/],
    value: () => 'cm3/s'
  },
  uom_ml_s: {
    match: [/(?:ml\/s)\b/],
    value: () => 'ml/s'
  },
  uom_cl_s: {
    match: [/(?:cl\/s)\b/],
    value: () => 'cl/s'
  },
  uom_dl_s: {
    match: [/(?:dl\/s)\b/],
    value: () => 'dl/s'
  },
  uom_l_s: {
    match: [/(?:l\/s)\b/],
    value: () => 'l/s'
  },
  uom_l_min: {
    match: [/(?:l\/min)\b/],
    value: () => 'l/min'
  },
  uom_l_h: {
    match: [/(?:l\/h)\b/],
    value: () => 'l/h'
  },
  uom_kl_s: {
    match: [/(?:kl\/s)\b/],
    value: () => 'kl/s'
  },
  uom_kl_min: {
    match: [/(?:kl\/min)\b/],
    value: () => 'kl/min'
  },
  uom_kl_h: {
    match: [/(?:kl\/h)\b/],
    value: () => 'kl/h'
  },
  uom_m3_s: {
    match: [/(?:m3\/s)\b/],
    value: () => 'm3/s'
  },
  uom_m3_min: {
    match: [/(?:m3\/min)\b/],
    value: () => 'm3/min'
  },
  uom_m3_h: {
    match: [/(?:m3\/s)\b/],
    value: () => 'm3/h'
  },
  uom_km3_s: {
    match: [/(?:km3\/s)\b/],
    value: () => 'km3/s'
  },
  uom_tsp_s: {
    match: [/(?:tsp\/s)\b/],
    value: () => 'tsp/s'
  },
  uom_Tbs_s: {
    match: [/(?:Tbs\/s)\b/],
    value: () => 'Tbs/s'
  },
  uom_in3_s: {
    match: [/(?:in3\/s)\b/],
    value: () => 'in3/s'
  },
  uom_in3_min: {
    match: [/(?:in3\/min)\b/],
    value: () => 'in3/min'
  },
  uom_in3_h: {
    match: [/(?:in3\/h)\b/],
    value: () => 'in3/h'
  },
  uom_floz_s: {
    match: [/(?:fl-oz\/s)\b/],
    value: () => 'fl-oz/s'
  },
  uom_floz_min: {
    match: [/(?:fl-oz\/min)\b/],
    value: () => 'fl-oz/min'
  },
  uom_floz_h: {
    match: [/(?:fl-oz\/h)\b/],
    value: () => 'fl-oz/h'
  },
  uom_cup_s: {
    match: [/(?:cup\/s)\b/],
    value: () => 'cup/s'
  },
  uom_pnt_s: {
    match: [/(?:pnt\/s)\b/],
    value: () => 'pnt/s'
  },
  uom_pnt_min: {
    match: [/(?:pnt\/min)\b/],
    value: () => 'pnt/min'
  },
  uom_pnt_h: {
    match: [/(?:pnt\/h)\b/],
    value: () => 'pnt/h'
  },
  uom_qt_s: {
    match: [/(?:qt\/s)\b/],
    value: () => 'qt/s'
  },
  uom_gal_s: {
    match: [/(?:gal\/s)\b/],
    value: () => 'gal/s'
  },
  uom_gal_min: {
    match: [/(?:gal\/min)\b/],
    value: () => 'gal/min'
  },
  uom_gal_h: {
    match: [/(?:gal\/h)\b/],
    value: () => 'gal/h'
  },
  uom_ft3_s: {
    match: [/(?:ft3\/s)\b/],
    value: () => 'ft3/s'
  },
  uom_ft3_min: {
    match: [/(?:ft\/min)\b/],
    value: () => 'ft3/min'
  },
  uom_ft3_h: {
    match: [/(?:ft3\/h)\b/],
    value: () => 'ft3/h'
  },
  uom_yd3_s: {
    match: [/(?:yd3\/s)\b/],
    value: () => 'yd3/s'
  },
  uom_yd3_min: {
    match: [/(?:yd3\/min)\b/],
    value: () => 'yd3/min'
  },
  uom_yd3_h: {
    match: [/(?:yd3\/h)\b/],
    value: () => 'yd3/h'
  },
  // Time
  uom_ns: {
    match: [/(?:ns)\b/],
    value: () => 'ns'
  },
  uom_mu: {
    match: [/(?:mu)\b/],
    value: () => 'mu'
  },
  uom_ms: {
    match: [/(?:ms)\b/],
    value: () => 'ms'
  },
  uom_min: {
    match: [/(?:min)\b/],
    value: () => 'min'
  },
  uom_week: {
    match: [/(?:week)\b/],
    value: () => 'week'
  },
  uom_month: {
    match: [/(?:month)\b/],
    value: () => 'month'
  },
  uom_year: {
    match: [/(?:year)\b/],
    value: () => 'year'
  },
  // Frequency
  uom_Hz: {
    match: [/(?:Hz)\b/],
    value: () => 'Hz'
  },
  uom_mHz: {
    match: [/(?:mHz)\b/],
    value: () => 'mHz'
  },
  uom_kHz: {
    match: [/(?:kHz)\b/],
    value: () => 'kHz'
  },
  uom_MHz: {
    match: [/(?:MHz)\b/],
    value: () => 'MHz'
  },
  uom_GHz: {
    match: [/(?:GHz)\b/],
    value: () => 'GHz'
  },
  uom_THz: {
    match: [/(?:THz)\b/],
    value: () => 'THz'
  },
  uom_rpm: {
    match: [/(?:rpm)\b/],
    value: () => 'rpm'
  },
  uom_deg_s: {
    match: [/(?:deg\/s)\b/],
    value: () => 'deg/s'
  },
  uom_rad_s: {
    match: [/(?:rad\/s)\b/],
    value: () => 'rad/s'
  },
  // Speed
  uom_m_s: {
    match: [/(?:m\/s)\b/],
    value: () => 'm/s'
  },
  uom_km_h: {
    match: [/(?:km\/h)\b/],
    value: () => 'km/h'
  },
  uom_m_h: {
    match: [/(?:m\/h)\b/],
    value: () => 'm/h'
  },
  uom_knot: {
    match: [/(?:knot)\b/],
    value: () => 'knot'
  },
  uom_ft_s: {
    match: [/(?:ft\/s)\b/],
    value: () => 'ft/s'
  },
  // Pace
  uom_s_m: {
    match: [/(?:s\/m)\b/],
    value: () => 's/m'
  },
  uom_min_km: {
    match: [/(?:min\/km)\b/],
    value: () => 'min/km'
  },
  uom_s_ft: {
    match: [/(?:s\/ft)\b/],
    value: () => 's/ft'
  },
  uom_min_ft: {
    match: [/(?:min\/ft)\b/],
    value: () => 'min/ft'
  },
  // Pressure
  uom_Pa: {
    match: [/(?:Pa)\b/],
    value: () => 'Pa'
  },
  uom_hPa: {
    match: [/(?:hPa)\b/],
    value: () => 'hPa'
  },
  uom_kPa: {
    match: [/(?:kPa)\b/],
    value: () => 'kPa'
  },
  uom_MPa: {
    match: [/(?:MPa)\b/],
    value: () => 'MPa'
  },
  uom_bar: {
    match: [/(?:bar)\b/],
    value: () => 'bar'
  },
  uom_torr: {
    match: [/(?:torr)\b/],
    value: () => 'torr'
  },
  uom_psi: {
    match: [/(?:psi)\b/],
    value: () => 'psi'
  },
  uom_ksi: {
    match: [/(?:ksi)\b/],
    value: () => 'ksi'
  },
  // Digital
  uom_Kb: {
    match: [/(?:Kb)\b/],
    value: () => 'Kb'
  },
  uom_Mb: {
    match: [/(?:Mb)\b/],
    value: () => 'Mb'
  },
  uom_Gb: {
    match: [/(?:Gb)\b/],
    value: () => 'Gb'
  },
  uom_Tb: {
    match: [/(?:Tb)\b/],
    value: () => 'Tb'
  },
  uom_KB: {
    match: [/(?:KB)\b/],
    value: () => 'KB'
  },
  uom_MB: {
    match: [/(?:MB)\b/],
    value: () => 'MB'
  },
  uom_GB: {
    match: [/(?:GB)\b/],
    value: () => 'GB'
  },
  uom_TB: {
    match: [/(?:TB)\b/],
    value: () => 'TB'
  },
  // Illuminance
  uom_lx: {
    match: [/(?:lx)\b/],
    value: () => 'lx'
  },
  uom_ftcd: {
    match: [/(?:ft-cd)\b/],
    value: () => 'ft-cd'
  },
  // Parts-per
  uom_ppm: {
    match: [/(?:ppm)\b/],
    value: () => 'ppm'
  },
  uom_ppb: {
    match: [/(?:ppb)\b/],
    value: () => 'ppb'
  },
  uom_ppt: {
    match: [/(?:ppt)\b/],
    value: () => 'ppt'
  },
  uom_ppq: {
    match: [/(?:ppq)\b/],
    value: () => 'ppq'
  },
  // Voltage
  uom_mV: {
    match: [/(?:mV)\b/],
    value: () => 'mV'
  },
  uom_kV: {
    match: [/(?:kV)\b/],
    value: () => 'kV'
  },
  // Current
  uom_mA: {
    match: [/(?:mA)\b/],
    value: () => 'mA'
  },
  uom_kA: {
    match: [/(?:kA)\b/],
    value: () => 'kA'
  },
  // Power
  uom_mW: {
    match: [/(?:mW)\b/],
    value: () => 'mW'
  },
  uom_kW: {
    match: [/(?:kW)\b/],
    value: () => 'kW'
  },
  uom_MW: {
    match: [/(?:MW)\b/],
    value: () => 'MW'
  },
  uom_GW: {
    match: [/(?:GW)\b/],
    value: () => 'GW'
  },
  // Apparent Power
  uom_VA: {
    match: [/(?:VA)\b/],
    value: () => 'VA'
  },
  uom_mVA: {
    match: [/(?:bmVA)\b/],
    value: () => 'mVA'
  },
  uom_kVA: {
    match: [/(?:kVA)\b/],
    value: () => 'kVA'
  },
  uom_MVA: {
    match: [/(?:bMVA)\b/],
    value: () => 'MVA'
  },
  uom_GVA: {
    match: [/(?:GVA)\b/],
    value: () => 'GVA'
  },
  // Reactive Power
  uom_VAR: {
    match: [/(?:VAR)\b/],
    value: () => 'VAR'
  },
  uom_mVAR: {
    match: [/(?:mVAR)\b/],
    value: () => 'mVAR'
  },
  uom_kVAR: {
    match: [/(?:kVAR)\b/],
    value: () => 'kVAR'
  },
  uom_MVAR: {
    match: [/(?:MVAR)\b/],
    value: () => 'MVAR'
  },
  uom_GVAR: {
    match: [/(?:GVAR)\b/],
    value: () => 'GVAR'
  },
  // Energy
  uom_Wh: {
    match: [/(?:Wh)\b/],
    value: () => 'Wh'
  },
  uom_mWh: {
    match: [/(?:mWh)\b/],
    value: () => 'mWh'
  },
  uom_kWh: {
    match: [/(?:kWh)\b/],
    value: () => 'kWh'
  },
  uom_MWh: {
    match: [/(?:MWh)\b/],
    value: () => 'MWh'
  },
  uom_GWh: {
    match: [/(?:GWh)\b/],
    value: () => 'GWh'
  },
  // Reactive Energy
  uom_VARh: {
    match: [/(?:VARh)\b/],
    value: () => 'VARh'
  },
  uom_mVARh: {
    match: [/(?:mVARh)\b/],
    value: () => 'mVARh'
  },
  uom_kVARh: {
    match: [/(?:kVARh)\b/],
    value: () => 'kVARh'
  },
  uom_MVARh: {
    match: [/(?:MVARh)\b/],
    value: () => 'MVARh'
  },
  uom_GVARh: {
    match: [/(?:GVARh)\b/],
    value: () => 'GVARh'
  },
  // Angle
  uom_deg: {
    match: [/(?:deg)\b/],
    value: () => 'deg'
  },
  uom_rad: {
    match: [/(?:rad)\b/],
    value: () => 'rad'
  },
  uom_grad: {
    match: [/(?:grad)\b/],
    value: () => 'grad'
  },
  uom_arcmin: {
    match: [/(?:arcmin)\b/],
    value: () => 'arcmin'
  },
  uom_arcsec: {
    match: [/(?:arcsec)\b/],
    value: () => 'arcsec'
  },

  /// Single letters last so they aren't greedy
  // Area
  uom_m: {
    match: [/(?:meters)\b/, /(?:meter)\b/, /(?:m)\b/],
    value: () => 'm'
  },
  // Mass
  uom_g: {
    match: [/(?:grams)\b/, /(?:gram)\b/, /(?:g)\b/],
    value: () => 'g'
  },
  uom_t: {
    match: [/(?:tonnes)\b/, /(?:tonne)\b/, /(?:t)\b/],
    value: () => 't'
  },
  // Volume
  uom_l: {
    match: [/(?:liters)\b/, /(?:liter)\b/, /(?:l)\b/],
    value: () => 'l'
  },
  // Temperature
  uom_C: {
    match: [/(?:C)\b/],
    value: () => 'C'
  },
  uom_F: {
    match: [/(?:F)\b/],
    value: () => 'F'
  },
  uom_K: {
    match: [/(?:K)\b/],
    value: () => 'K'
  },
  uom_R: {
    match: [/(?:R)\b/],
    value: () => 'R'
  },
  // Time
  uom_s: {
    match: [/(?:s)\b/],
    value: () => 's'
  },
  uom_h: {
    match: [/(?:h)\b/],
    value: () => 'h'
  },
  uom_d: {
    match: [/(?:d)\b/],
    value: () => 'd'
  },
  // Digital
  uom_b: {
    match: [/(?:b)\b/],
    value: () => 'b'
  },
  uom_B: {
    match: [/(?:B)\b/],
    value: () => 'B'
  },
  // Voltage
  uom_V: {
    match: [/(?:V)\b/],
    value: () => 'V'
  },
  // Current
  uom_A: {
    match: [/(?:A)\b/],
    value: () => 'A'
  },
  // Power
  uom_W: {
    match: [/(?:W)\b/],
    value: () => 'W'
  },
  // Energy
  uom_J: {
    match: [/(?:J)\b/],
    value: () => 'J'
  },
  uom_kJ: {
    match: [/(?:kJ)\b/],
    value: () => 'kJ'
  }
};

// LR: Configure Lexer
const lexer = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\n/, lineBreaks: true },

  // Comments overule everything
  comment: /\/\/.*?$/,

  // Parenthesis
  lparen: '(',
  rparen: ')',

  ...dataTypes,

  // Variable Identiefier -> var $paulVar = ...
  identifier: {
    match: /\$[a-zA-Z][a-zA-Z_0-9]*/,
    value: x => x.replace('$', '')
  },

  // Variable Assignment
  assign: '=',

  // Operators
  ...operators,

  // Functions
  ...functions,

  // Constants
  ...constants,

  // Conversion
  convertTo: [/\b(?:as)\b/, /\b(?:to)\b/, /\b(?:in)\b/],

  // Increase/Decrease
  increase: /\b(?:increase)\b/,
  decrease: /\b(?:decrease)\b/,

  // Currency
  currencyCode: [
    /AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BRL|BSD|BTN|BWP|BYR|BZD|CAD|CDF|CHF|CLP|CNY|COP|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GGP|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|IMP|INR|IQD|IRR|ISK|JEP|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRO|MUR|MVR|MWK|MXN|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SPL|SRD|STD|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TVD|TWD|TZS|UAH|UGX|USD|UYU|UZS|VEF|VND|VUV|WST|XAF|XCD|XDR|XOF|XPF|YER|ZAR|ZMW|ZWD/
  ],
  currencySymbol: ['$', '£', '€'],

  // Units of Measurement
  // NOTE: UoMs need to be last as they match single letter too
  ...unitsOfMeasurement,

  // Catch-all
  word: /[a-zA-Z|-]+/,
  undefined: /[^\s]+/
});

export default lexer;
