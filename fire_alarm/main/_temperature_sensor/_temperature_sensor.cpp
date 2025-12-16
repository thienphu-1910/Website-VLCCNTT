#include "_temperature_sensor.h"

TemperatureSensor::TemperatureSensor(adc_channel_t pin) {
    _pin = pin;
}

void TemperatureSensor::start() {
    adc_oneshot_unit_init_cfg_t temperature_config = {};
    temperature_config.unit_id = ADC_UNIT_1;
    temperature_config.clk_src = ADC_RTC_CLK_SRC_DEFAULT;

    ESP_ERROR_CHECK(adc_oneshot_new_unit(&temperature_config, &_handler));

    adc_oneshot_chan_cfg_t channel_config = {};
    channel_config.bitwidth = ADC_BITWIDTH_12;
    channel_config.atten = ADC_ATTEN_DB_12;

    ESP_ERROR_CHECK(adc_oneshot_config_channel(_handler, _pin, &channel_config));
}

float TemperatureSensor::getTemperature() {
    int value = 0.0;

    ESP_ERROR_CHECK(adc_oneshot_read(_handler, _pin, &value));
}