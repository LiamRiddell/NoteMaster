import moo from 'moo';

// Data Types
const dataTypes = {
  // Date - These will clash with number parsing. This is why it takes precedence -> date-tokens.js
  date: /(?:[0-2][0-9]|(?:3)[0-1])(?:\/)(?:(?:(?:0)[0-9])|(?:(?:1)[0-2]))(?:\/)\d{4}/,

  // Basic Types - Order of precedence
  hex: {
    match: /0[xX][0-9a-fA-F]+/,
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
  modulus: ['%', 'modulus']
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
  pi: 'pi',
  e: 'e'
};

const unitsOfMeasurement = {
  // Length
  uom_mm: {
    match: [/\b(?:millimeters)\b/, /\b(?:millimeter)\b/, /\b(?:mm)\b/],
    value: () => 'mm'
  },
  uom_cm: {
    match: [/\b(?:centimeters)\b/, /\b(?:centimeter)\b/, /\b(?:cm)\b/],
    value: () => 'cm'
  },
  uom_in: {
    match: [/\b(?:inches)\b/, /\b(?:inch)\b/, /\b(?:in)\b/],
    value: () => 'in'
  },
  uom_ftus: {
    match: [/\b(?:ft-us)\b/],
    value: () => 'ft-us'
  },
  uom_ft: {
    match: [/\b(?:feet)\b/, /\b(?:foot)\b/, /\b(?:ft)\b/],
    value: () => 'ft'
  },
  uom_mi: {
    match: [/\b(?:miles)\b/, /\b(?:mile)\b/, /\b(?:mi)\b/],
    value: () => 'mi'
  },
  // Area
  uom_mm2: {
    match: [/\b(?:mm2)\b/],
    value: () => 'mm2'
  },
  uom_cm2: {
    match: [/\b(?:cm2)\b/],
    value: () => 'cm2'
  },
  uom_m2: {
    match: [/\b(?:m2)\b/],
    value: () => 'm2'
  },
  uom_ha: {
    match: [/\b(?:hectare)\b/, /\b(?:hectares)\b/, /\b(?:ha)\b/],
    value: () => 'ha'
  },
  uom_km2: {
    match: [/\b(?:km2)\b/],
    value: () => 'km2'
  },
  uom_in2: {
    match: [/\b(?:in2)\b/],
    value: () => 'in2'
  },
  uom_ft2: {
    match: [/\b(?:ft2)\b/],
    value: () => 'ft2'
  },
  uom_ac: {
    match: [/\b(?:ac)\b/],
    value: () => 'ac'
  },
  uom_mi2: {
    match: [/\b(?:mi2)\b/],
    value: () => 'mi2'
  },
  // Mass
  uom_mcg: {
    match: [/\b(?:mcg)\b/],
    value: () => 'mcg'
  },
  uom_mg: {
    match: [/\b(?:mg)\b/],
    value: () => 'mg'
  },
  uom_kg: {
    match: [/\b(?:kg)\b/],
    value: () => 'kg'
  },
  uom_oz: {
    match: [/\b(?:oz)\b/],
    value: () => 'oz'
  },
  uom_lb: {
    match: [/\b(?:lb)\b/],
    value: () => 'lb'
  },
  uom_mt: {
    match: [/\b(?:mt)\b/],
    value: () => 'mt'
  },
  // Volume
  uom_mm3: {
    match: [/\b(?:mm3)\b/],
    value: () => 'mm3'
  },
  uom_cm3: {
    match: [/\b(?:cm3)\b/],
    value: () => 'cm3'
  },
  uom_ml: {
    match: [/\b(?:ml)\b/],
    value: () => 'ml'
  },
  uom_kl: {
    match: [/\b(?:kl)\b/],
    value: () => 'kl'
  },
  uom_m3: {
    match: [/\b(?:m3)\b/],
    value: () => 'm3'
  },
  uom_km3: {
    match: [/\b(?:km3)\b/],
    value: () => 'km3'
  },
  uom_tsp: {
    match: [/\b(?:tsp)\b/],
    value: () => 'tsp'
  },
  uom_Tbs: {
    match: [/\b(?:Tbs)\b/],
    value: () => 'Tbs'
  },
  uom_in3: {
    match: [/\b(?:in3)\b/],
    value: () => 'in3'
  },
  uom_floz: {
    match: [/\b(?:fl-oz)\b/, /\b(?:floz)\b/],
    value: () => 'fl-oz'
  },
  uom_cup: {
    match: [/\b(?:cup)\b/],
    value: () => 'cup'
  },
  uom_pnt: {
    match: [/\b(?:pnt)\b/],
    value: () => 'pnt'
  },
  uom_qt: {
    match: [/\b(?:qt)\b/],
    value: () => 'qt'
  },
  uom_gal: {
    match: [/\b(?:gal)\b/],
    value: () => 'gal'
  },
  uom_ft3: {
    match: [/\b(?:ft3)\b/],
    value: () => 'ft3'
  },
  uom_yd3: {
    match: [/\b(?:yd3)\b/],
    value: () => 'yd3'
  },
  // Volume Flow Rate
  uom_mm3_s: {
    match: [/\b(?:mm3\/s)\b/],
    value: () => 'mm3/s'
  },
  uom_cm3_s: {
    match: [/\b(?:cm3\/s)\b/],
    value: () => 'cm3/s'
  },
  uom_ml_s: {
    match: [/\b(?:ml\/s)\b/],
    value: () => 'ml/s'
  },
  uom_cl_s: {
    match: [/\b(?:cl\/s)\b/],
    value: () => 'cl/s'
  },
  uom_dl_s: {
    match: [/\b(?:dl\/s)\b/],
    value: () => 'dl/s'
  },
  uom_l_s: {
    match: [/\b(?:l\/s)\b/],
    value: () => 'l/s'
  },
  uom_l_min: {
    match: [/\b(?:l\/min)\b/],
    value: () => 'l/min'
  },
  uom_l_h: {
    match: [/\b(?:l\/h)\b/],
    value: () => 'l/h'
  },
  uom_kl_s: {
    match: [/\b(?:kl\/s)\b/],
    value: () => 'kl/s'
  },
  uom_kl_min: {
    match: [/\b(?:kl\/min)\b/],
    value: () => 'kl/min'
  },
  uom_kl_h: {
    match: [/\b(?:kl\/h)\b/],
    value: () => 'kl/h'
  },
  uom_m3_s: {
    match: [/\b(?:m3\/s)\b/],
    value: () => 'm3/s'
  },
  uom_m3_min: {
    match: [/\b(?:m3\/min)\b/],
    value: () => 'm3/min'
  },
  uom_m3_h: {
    match: [/\b(?:m3\/s)\b/],
    value: () => 'm3/h'
  },
  uom_km3_s: {
    match: [/\b(?:km3\/s)\b/],
    value: () => 'km3/s'
  },
  uom_tsp_s: {
    match: [/\b(?:tsp\/s)\b/],
    value: () => 'tsp/s'
  },
  uom_Tbs_s: {
    match: [/\b(?:Tbs\/s)\b/],
    value: () => 'Tbs/s'
  },
  uom_in3_s: {
    match: [/\b(?:in3\/s)\b/],
    value: () => 'in3/s'
  },
  uom_in3_min: {
    match: [/\b(?:in3\/min)\b/],
    value: () => 'in3/min'
  },
  uom_in3_h: {
    match: [/\b(?:in3\/h)\b/],
    value: () => 'in3/h'
  },
  uom_floz_s: {
    match: [/\b(?:fl-oz\/s)\b/],
    value: () => 'fl-oz/s'
  },
  uom_floz_min: {
    match: [/\b(?:fl-oz\/min)\b/],
    value: () => 'fl-oz/min'
  },
  uom_floz_h: {
    match: [/\b(?:fl-oz\/h)\b/],
    value: () => 'fl-oz/h'
  },
  uom_cup_s: {
    match: [/\b(?:cup\/s)\b/],
    value: () => 'cup/s'
  },
  uom_pnt_s: {
    match: [/\b(?:pnt\/s)\b/],
    value: () => 'pnt/s'
  },
  uom_pnt_min: {
    match: [/\b(?:pnt\/min)\b/],
    value: () => 'pnt/min'
  },
  uom_pnt_h: {
    match: [/\b(?:pnt\/h)\b/],
    value: () => 'pnt/h'
  },
  uom_qt_s: {
    match: [/\b(?:qt\/s)\b/],
    value: () => 'qt/s'
  },
  uom_gal_s: {
    match: [/\b(?:gal\/s)\b/],
    value: () => 'gal/s'
  },
  uom_gal_min: {
    match: [/\b(?:gal\/min)\b/],
    value: () => 'gal/min'
  },
  uom_gal_h: {
    match: [/\b(?:gal\/h)\b/],
    value: () => 'gal/h'
  },
  uom_ft3_s: {
    match: [/\b(?:ft3\/s)\b/],
    value: () => 'ft3/s'
  },
  uom_ft3_min: {
    match: [/\b(?:ft\/min)\b/],
    value: () => 'ft3/min'
  },
  uom_ft3_h: {
    match: [/\b(?:ft3\/h)\b/],
    value: () => 'ft3/h'
  },
  uom_yd3_s: {
    match: [/\b(?:yd3\/s)\b/],
    value: () => 'yd3/s'
  },
  uom_yd3_min: {
    match: [/\b(?:yd3\/min)\b/],
    value: () => 'yd3/min'
  },
  uom_yd3_h: {
    match: [/\b(?:yd3\/h)\b/],
    value: () => 'yd3/h'
  },
  // Time
  uom_ns: {
    match: [/\b(?:ns)\b/],
    value: () => 'ns'
  },
  uom_mu: {
    match: [/\b(?:mu)\b/],
    value: () => 'mu'
  },
  uom_ms: {
    match: [/\b(?:ms)\b/],
    value: () => 'ms'
  },
  uom_min: {
    match: [/\b(?:min)\b/],
    value: () => 'min'
  },
  uom_week: {
    match: [/\b(?:week)\b/],
    value: () => 'week'
  },
  uom_month: {
    match: [/\b(?:month)\b/],
    value: () => 'month'
  },
  uom_year: {
    match: [/\b(?:year)\b/],
    value: () => 'year'
  },
  // Frequency
  uom_Hz: {
    match: [/\b(?:Hz)\b/],
    value: () => 'Hz'
  },
  uom_mHz: {
    match: [/\b(?:mHz)\b/],
    value: () => 'mHz'
  },
  uom_kHz: {
    match: [/\b(?:kHz)\b/],
    value: () => 'kHz'
  },
  uom_MHz: {
    match: [/\b(?:MHz)\b/],
    value: () => 'MHz'
  },
  uom_GHz: {
    match: [/\b(?:GHz)\b/],
    value: () => 'GHz'
  },
  uom_THz: {
    match: [/\b(?:THz)\b/],
    value: () => 'THz'
  },
  uom_rpm: {
    match: [/\b(?:rpm)\b/],
    value: () => 'rpm'
  },
  uom_deg_s: {
    match: [/\b(?:deg\/s)\b/],
    value: () => 'deg/s'
  },
  uom_rad_s: {
    match: [/\b(?:rad\/s)\b/],
    value: () => 'rad/s'
  },
  // Speed
  uom_m_s: {
    match: [/\b(?:m\/s)\b/],
    value: () => 'm/s'
  },
  uom_km_h: {
    match: [/\b(?:km\/h)\b/],
    value: () => 'km/h'
  },
  uom_m_h: {
    match: [/\b(?:m\/h)\b/],
    value: () => 'm/h'
  },
  uom_knot: {
    match: [/\b(?:knot)\b/],
    value: () => 'knot'
  },
  uom_ft_s: {
    match: [/\b(?:ft\/s)\b/],
    value: () => 'ft/s'
  },
  // Pace
  uom_s_m: {
    match: [/\b(?:s\/m)\b/],
    value: () => 's/m'
  },
  uom_min_km: {
    match: [/\b(?:min\/km)\b/],
    value: () => 'min/km'
  },
  uom_s_ft: {
    match: [/\b(?:s\/ft)\b/],
    value: () => 's/ft'
  },
  uom_min_ft: {
    match: [/\b(?:min\/ft)\b/],
    value: () => 'min/ft'
  },
  // Pressure
  uom_Pa: {
    match: [/\b(?:Pa)\b/],
    value: () => 'Pa'
  },
  uom_hPa: {
    match: [/\b(?:hPa)\b/],
    value: () => 'hPa'
  },
  uom_kPa: {
    match: [/\b(?:kPa)\b/],
    value: () => 'kPa'
  },
  uom_MPa: {
    match: [/\b(?:MPa)\b/],
    value: () => 'MPa'
  },
  uom_bar: {
    match: [/\b(?:bar)\b/],
    value: () => 'bar'
  },
  uom_torr: {
    match: [/\b(?:torr)\b/],
    value: () => 'torr'
  },
  uom_psi: {
    match: [/\b(?:psi)\b/],
    value: () => 'psi'
  },
  uom_ksi: {
    match: [/\b(?:ksi)\b/],
    value: () => 'ksi'
  },
  // Digital
  uom_Kb: {
    match: [/\b(?:Kb)\b/],
    value: () => 'Kb'
  },
  uom_Mb: {
    match: [/\b(?:Mb)\b/],
    value: () => 'Mb'
  },
  uom_Gb: {
    match: [/\b(?:Gb)\b/],
    value: () => 'Gb'
  },
  uom_Tb: {
    match: [/\b(?:Tb)\b/],
    value: () => 'Tb'
  },
  uom_KB: {
    match: [/\b(?:KB)\b/],
    value: () => 'KB'
  },
  uom_MB: {
    match: [/\b(?:MB)\b/],
    value: () => 'MB'
  },
  uom_GB: {
    match: [/\b(?:GB)\b/],
    value: () => 'GB'
  },
  uom_TB: {
    match: [/\b(?:TB)\b/],
    value: () => 'TB'
  },
  // Illuminance
  uom_lx: {
    match: [/\b(?:lx)\b/],
    value: () => 'lx'
  },
  uom_ftcd: {
    match: [/\b(?:ft-cd)\b/],
    value: () => 'ft-cd'
  },
  // Parts-per
  uom_ppm: {
    match: [/\b(?:ppm)\b/],
    value: () => 'ppm'
  },
  uom_ppb: {
    match: [/\b(?:ppb)\b/],
    value: () => 'ppb'
  },
  uom_ppt: {
    match: [/\b(?:ppt)\b/],
    value: () => 'ppt'
  },
  uom_ppq: {
    match: [/\b(?:ppq)\b/],
    value: () => 'ppq'
  },
  // Voltage
  uom_mV: {
    match: [/\b(?:mV)\b/],
    value: () => 'mV'
  },
  uom_kV: {
    match: [/\b(?:kV)\b/],
    value: () => 'kV'
  },
  // Current
  uom_mA: {
    match: [/\b(?:mA)\b/],
    value: () => 'mA'
  },
  uom_kA: {
    match: [/\b(?:kA)\b/],
    value: () => 'kA'
  },
  // Power
  uom_mW: {
    match: [/\b(?:mW)\b/],
    value: () => 'mW'
  },
  uom_kW: {
    match: [/\b(?:kW)\b/],
    value: () => 'kW'
  },
  uom_MW: {
    match: [/\b(?:MW)\b/],
    value: () => 'MW'
  },
  uom_GW: {
    match: [/\b(?:GW)\b/],
    value: () => 'GW'
  },
  // Apparent Power
  uom_VA: {
    match: [/\b(?:VA)\b/],
    value: () => 'VA'
  },
  uom_mVA: {
    match: [/\b(?:bmVA)\b/],
    value: () => 'mVA'
  },
  uom_kVA: {
    match: [/\b(?:kVA)\b/],
    value: () => 'kVA'
  },
  uom_MVA: {
    match: [/\b(?:bMVA)\b/],
    value: () => 'MVA'
  },
  uom_GVA: {
    match: [/\b(?:GVA)\b/],
    value: () => 'GVA'
  },
  // Reactive Power
  uom_VAR: {
    match: [/\b(?:VAR)\b/],
    value: () => 'VAR'
  },
  uom_mVAR: {
    match: [/\b(?:mVAR)\b/],
    value: () => 'mVAR'
  },
  uom_kVAR: {
    match: [/\b(?:kVAR)\b/],
    value: () => 'kVAR'
  },
  uom_MVAR: {
    match: [/\b(?:MVAR)\b/],
    value: () => 'MVAR'
  },
  uom_GVAR: {
    match: [/\b(?:GVAR)\b/],
    value: () => 'GVAR'
  },
  // Energy
  uom_Wh: {
    match: [/\b(?:Wh)\b/],
    value: () => 'Wh'
  },
  uom_mWh: {
    match: [/\b(?:mWh)\b/],
    value: () => 'mWh'
  },
  uom_kWh: {
    match: [/\b(?:kWh)\b/],
    value: () => 'kWh'
  },
  uom_MWh: {
    match: [/\b(?:MWh)\b/],
    value: () => 'MWh'
  },
  uom_GWh: {
    match: [/\b(?:GWh)\b/],
    value: () => 'GWh'
  },
  // Reactive Energy
  uom_VARh: {
    match: [/\b(?:VARh)\b/],
    value: () => 'VARh'
  },
  uom_mVARh: {
    match: [/\b(?:mVARh)\b/],
    value: () => 'mVARh'
  },
  uom_kVARh: {
    match: [/\b(?:kVARh)\b/],
    value: () => 'kVARh'
  },
  uom_MVARh: {
    match: [/\b(?:MVARh)\b/],
    value: () => 'MVARh'
  },
  uom_GVARh: {
    match: [/\b(?:GVARh)\b/],
    value: () => 'GVARh'
  },
  // Angle
  uom_deg: {
    match: [/\b(?:deg)\b/],
    value: () => 'deg'
  },
  uom_rad: {
    match: [/\b(?:rad)\b/],
    value: () => 'rad'
  },
  uom_grad: {
    match: [/\b(?:grad)\b/],
    value: () => 'grad'
  },
  uom_arcmin: {
    match: [/\b(?:arcmin)\b/],
    value: () => 'arcmin'
  },
  uom_arcsec: {
    match: [/\b(?:arcsec)\b/],
    value: () => 'arcsec'
  },

  /// Single letters last so they aren't greedy
  // Area
  uom_m: {
    match: [/\b(?:meters)\b/, /\b(?:meter)\b/, /\b(?:m)\b/],
    value: () => 'm'
  },
  // Mass
  uom_g: {
    match: [/\b(?:grams)\b/, /\b(?:gram)\b/, /\b(?:g)\b/],
    value: () => 'g'
  },
  uom_t: {
    match: [/\b(?:tonnes)\b/, /\b(?:tonne)\b/, /\b(?:t)\b/],
    value: () => 't'
  },
  // Volume
  uom_l: {
    match: [/\b(?:liters)\b/, /\b(?:liter)\b/, /\b(?:l)\b/],
    value: () => 'l'
  },
  // Temperature
  uom_C: {
    match: [/\b(?:C)\b/],
    value: () => 'C'
  },
  uom_F: {
    match: [/\b(?:F)\b/],
    value: () => 'F'
  },
  uom_K: {
    match: [/\b(?:K)\b/],
    value: () => 'K'
  },
  uom_R: {
    match: [/\b(?:R)\b/],
    value: () => 'R'
  },
  // Time
  uom_s: {
    match: [/\b(?:s)\b/],
    value: () => 's'
  },
  uom_h: {
    match: [/\b(?:h)\b/],
    value: () => 'h'
  },
  uom_d: {
    match: [/\b(?:d)\b/],
    value: () => 'd'
  },
  // Digital
  uom_b: {
    match: [/\b(?:b)\b/],
    value: () => 'b'
  },
  uom_B: {
    match: [/\b(?:B)\b/],
    value: () => 'B'
  },
  // Voltage
  uom_V: {
    match: [/\b(?:V)\b/],
    value: () => 'V'
  },
  // Current
  uom_A: {
    match: [/\b(?:A)\b/],
    value: () => 'A'
  },
  // Power
  uom_W: {
    match: [/\b(?:W)\b/],
    value: () => 'W'
  },
  // Energy
  uom_J: {
    match: [/\b(?:J)\b/],
    value: () => 'J'
  },
  uom_kJ: {
    match: [/\b(?:kJ)\b/],
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
