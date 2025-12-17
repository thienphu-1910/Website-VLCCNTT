set(srcs)
set(include_dirs "include")

idf_component_register(
    SRCS "_thermistor.cpp" "${srcs}"
    INCLUDE_DIRS "${include_dirs}"
    PRIV_REQUIRES esp_adc
)