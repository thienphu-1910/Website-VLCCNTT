#include <math.h>
#include "_thermistor.h"
#include "esp_log.h"

Thermistor::Thermistor(const thermistor_config_t *config) {
    esp_err_t ret = ESP_OK;

    if (config == NULL) {
        ESP_LOGW(TAG, "arg is invalid");
        abort();
    }

    _config = *config;
    adc_oneshot_unit_init_cfg_t init_config = {
        .unit_id = config->unit,
    };
    ESP_ERROR_CHECK(adc_oneshot_new_unit(&init_config, &_adc_handle));

    adc_oneshot_chan_cfg_t chan_config = {
        .atten = config->atten,
        .bitwidth = ADC_BITWIDTH_12, 
    };
    ESP_ERROR_CHECK(adc_oneshot_config_channel(_adc_handle, config->channel, &chan_config));

    adc_cali_line_fitting_config_t cali_config = {
        .unit_id = config->unit,
        .atten = config->atten,
        .bitwidth = ADC_BITWIDTH_12,
    };
    ESP_ERROR_CHECK(adc_cali_create_scheme_line_fitting(&cali_config, &_adc_cali_handle));
}

Thermistor::~Thermistor() {
    ESP_ERROR_CHECK(adc_cali_delete_scheme_line_fitting(_adc_cali_handle));
    ESP_ERROR_CHECK(adc_oneshot_del_unit(_adc_handle));
}

float Thermistor::temperature() {
    int raw_value = 0;
    ESP_ERROR_CHECK(adc_oneshot_read(_adc_handle, _config.channel, &raw_value));

    int voltage = 0;
    ESP_ERROR_CHECK(adc_cali_raw_to_voltage(_adc_cali_handle, raw_value, &voltage));

    uint32_t r_ntc_ohm = _config.fixed_ohm * voltage / (_config.vdd_mv - voltage);

    float kevin_t = 1.0 / (log(1.0 * r_ntc_ohm / _config.r25_ohm) * 1.0 / _config.b_value + 1.0 / 298.15);
    float celsius_t = kevin_t - 273.0;
    
    return celsius_t;
}