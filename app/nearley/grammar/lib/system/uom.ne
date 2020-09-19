# Lexer: Moo
@lexer lexer

# UoM System - Entry
UoMSystem -> convertUoMToUoM {% id %}

# Unit Defintion
unit -> number _ unitOfMeasurement {% ([v,,u]) => ast.unit(v, u) %}

# Define the rules for the metric systems
# 1. 100 meters to centimeters
# 2. 10.4 meters as decimeters
convertUoMToUoM
    -> unit _ convertTo _ unitOfMeasurement {% ([v,,,,b]) => ast.unitConversion(v, b) %}

# Define all the metric system as one rule
unitOfMeasurement
    # Length
    -> %uom_mm {% id %}
    | %uom_cm {% id %}
    | "in" {% id %}
    | "inch" {% id %}
    | "inches" {% id %}
    | %uom_ftus {% id %}
    | %uom_ft {% id %}
    | %uom_mi {% id %}
    # Area
    | %uom_mm2 {% id %}
    | %uom_cm2 {% id %}
    | %uom_m2 {% id %}
    | %uom_ha {% id %}
    | %uom_km2 {% id %}
    | %uom_in2 {% id %}
    | %uom_ft2 {% id %}
    | %uom_ac {% id %}
    | %uom_mi2 {% id %}
    # Mass
    | %uom_mcg {% id %}
    | %uom_mg {% id %}
    | %uom_kg {% id %}
    | %uom_oz {% id %}
    | %uom_lb {% id %}
    | %uom_mt {% id %}
    # Volume
    | %uom_mm3 {% id %}
    | %uom_cm3 {% id %}
    | %uom_ml {% id %}
    | %uom_kl {% id %}
    | %uom_m3 {% id %}
    | %uom_km3 {% id %}
    | %uom_tsp {% id %}
    | %uom_Tbs {% id %}
    | %uom_in3 {% id %}
    | %uom_floz {% id %}
    | %uom_cup {% id %}
    | %uom_pnt {% id %}
    | %uom_qt {% id %}
    | %uom_gal {% id %}
    | %uom_ft3 {% id %}
    | %uom_yd3 {% id %}
    # Volume Flow Rate
    | %uom_mm3_s {% id %}
    | %uom_cm3_s {% id %}
    | %uom_ml_s {% id %}
    | %uom_cl_s {% id %}
    | %uom_dl_s {% id %}
    | %uom_l_s {% id %}
    | %uom_l_min {% id %}
    | %uom_l_h {% id %}
    | %uom_kl_s {% id %}
    | %uom_kl_min {% id %}
    | %uom_kl_h {% id %}
    | %uom_m3_s {% id %}
    | %uom_m3_min {% id %}
    | %uom_m3_h {% id %}
    | %uom_km3_s {% id %}
    | %uom_tsp_s {% id %}
    | %uom_Tbs_s {% id %}
    | %uom_in3_s {% id %}
    | %uom_in3_min {% id %}
    | %uom_in3_h {% id %}
    | %uom_floz_s {% id %}
    | %uom_floz_min {% id %}
    | %uom_floz_h {% id %}
    | %uom_cup_s {% id %}
    | %uom_pnt_s {% id %}
    | %uom_pnt_min {% id %}
    | %uom_pnt_h {% id %}
    | %uom_qt_s {% id %}
    | %uom_gal_s {% id %}
    | %uom_gal_min {% id %}
    | %uom_gal_h {% id %}
    | %uom_ft3_s {% id %}
    | %uom_ft3_min {% id %}
    | %uom_ft3_h {% id %}
    | %uom_yd3_s {% id %}
    | %uom_yd3_min {% id %}
    | %uom_yd3_h {% id %}
    # Time
    | %uom_ns {% id %}
    | %uom_mu {% id %}
    | %uom_ms {% id %}
    | %uom_min {% id %}
    | %uom_week {% id %}
    | %uom_month {% id %}
    | %uom_year {% id %}
    # Frequency
    | %uom_Hz {% id %}
    | %uom_mHz {% id %}
    | %uom_kHz {% id %}
    | %uom_MHz {% id %}
    | %uom_GHz {% id %}
    | %uom_THz {% id %}
    | %uom_rpm {% id %}
    | %uom_deg_s {% id %}
    | %uom_rad_s {% id %}
    # Speed
    | %uom_m_s {% id %}
    | %uom_km_h {% id %}
    | %uom_m_h {% id %}
    | %uom_knot {% id %}
    | %uom_ft_s {% id %}
    # Pace
    | %uom_s_m {% id %}
    | %uom_min_km {% id %}
    | %uom_s_ft {% id %}
    | %uom_min_ft {% id %}
    # Pressure
    | %uom_Pa {% id %}
    | %uom_hPa {% id %}
    | %uom_kPa {% id %}
    | %uom_MPa {% id %}
    | %uom_bar {% id %}
    | %uom_torr {% id %}
    | %uom_psi {% id %}
    | %uom_ksi {% id %}
    # Digital
    | %uom_Kb {% id %}
    | %uom_Mb {% id %}
    | %uom_Gb {% id %}
    | %uom_Tb {% id %}
    | %uom_KB {% id %}
    | %uom_MB {% id %}
    | %uom_GB {% id %}
    | %uom_TB {% id %}
    # Illuminance
    | %uom_lx {% id %}
    | %uom_ftcd {% id %}
    # Parts-per
    | %uom_ppm {% id %}
    | %uom_ppb {% id %}
    | %uom_ppt {% id %}
    | %uom_ppq {% id %}
    # Voltage
    | %uom_mV {% id %}
    | %uom_kV {% id %}
    # Current
    | %uom_mA {% id %}
    | %uom_kA {% id %}
    # Power
    | %uom_mW {% id %}
    | %uom_kW {% id %}
    | %uom_MW {% id %}
    | %uom_GW {% id %}
    # Apparent Power
    | %uom_VA {% id %}
    | %uom_mVA {% id %}
    | %uom_kVA {% id %}
    | %uom_MVA {% id %}
    | %uom_GVA {% id %}
    # Reactive Power
    | %uom_VAR {% id %}
    | %uom_mVAR {% id %}
    | %uom_kVAR {% id %}
    | %uom_MVAR {% id %}
    | %uom_GVAR {% id %}
    # Energy
    | %uom_Wh {% id %}
    | %uom_mWh {% id %}
    | %uom_kWh {% id %}
    | %uom_MWh {% id %}
    | %uom_GWh {% id %}
    # Reactive Energy
    | %uom_VARh {% id %}
    | %uom_mVARh {% id %}
    | %uom_kVARh {% id %}
    | %uom_MVARh {% id %}
    | %uom_GVARh {% id %}
    # Angle
    | %uom_deg {% id %}
    | %uom_rad {% id %}
    | %uom_grad {% id %}
    | %uom_arcmin {% id %}
    | %uom_arcsec {% id %}

    # Single Letter UoM's
    # Area
    | %uom_m {% id %}
    # Mass
    | %uom_g {% id %}
    | %uom_t {% id %}
    # Volume
    | %uom_l {% id %}
    # Temperature
    | %uom_C {% id %}
    | %uom_F {% id %}
    | %uom_K {% id %}
    | %uom_R {% id %}
    # Time
    | %uom_s {% id %}
    | %uom_h {% id %}
    | %uom_d {% id %}
    # Digital
    | %uom_b {% id %}
    | %uom_B {% id %}
    # Voltage
    | %uom_V {% id %}
    # Current
    | %uom_A {% id %}
    # Power
    | %uom_W {% id %}
    # Energy
    | %uom_J {% id %}
    | %uom_kJ {% id %}



