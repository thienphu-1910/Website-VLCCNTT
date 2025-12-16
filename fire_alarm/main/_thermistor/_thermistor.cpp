#include <math.h>
#include "_thermistor.h"
#include "esp_log.h"

Thermistor::Thermistor(adc_channel_t channel)
    : _channel(channel), _adc_handle(NULL) {}

void Thermistor::start() {
    adc_unit_t unit_id = ADC_UNIT_1;
    adc_atten_t atten = ADC_ATTEN_DB_12;
    adc_bitwidth_t bitwidth = ADC_BITWIDTH_12;

    adc_oneshot_unit_init_cfg_t init_config = {
        .unit_id = unit_id,
        .ulp_mode = ADC_ULP_MODE_DISABLE,
    };
    ESP_ERROR_CHECK(adc_oneshot_new_unit(&init_config, &_adc_handle));

    adc_oneshot_chan_cfg_t config = {
        .atten = atten,
        .bitwidth = bitwidth,
    };
    ESP_ERROR_CHECK(adc_oneshot_config_channel(_adc_handle, _channel, &config));

    adc_cali_line_fitting_config_t cali_config = {
        .unit_id = unit_id,
        .atten = atten,
        .bitwidth = bitwidth,
    };
    ESP_ERROR_CHECK(adc_cali_create_scheme_line_fitting(&cali_config, &_adc_cali_handle));
}

float Thermistor::temperature() {
    int raw_value = 0;
    ESP_ERROR_CHECK(adc_oneshot_read(_adc_handle, _channel, &raw_value));

    int voltage = 0;
    ESP_ERROR_CHECK(adc_cali_raw_to_voltage(_adc_cali_handle, raw_value, &voltage));

    uint32_t r_ntc_ohm = 0;
    r_ntc_ohm = voltage * _fixed_ohm / (_vdd_mv - voltage);

    float temperature = 1.0 / (log(1.0 * r_ntc_ohm / _r25_ohm) * 1.0 / _b_value + 1.0 / 298.15) - 273.0;
    
    return temperature;
}