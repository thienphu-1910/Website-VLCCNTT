#include "_smoke_sensor.hpp"
#include "esp_adc/adc_oneshot.h"
#include "esp_log.h"

SmokeSensor::SmokeSensor(adc_channel_t analog_pin, int threshold)
    : _analog_pin(analog_pin), _threshold(threshold), _current_smoke_value(0) {}

SmokeSensor::~SmokeSensor() {
    if (_adc_handle != nullptr) {
        adc_oneshot_del_unit(_adc_handle);
    }
}

bool SmokeSensor::start() {
    adc_oneshot_chan_cfg_t channel_config = {
        .atten = ADC_ATTEN_DB_12,
        .bitwidth = ADC_BITWIDTH_DEFAULT
    };

    esp_err_t chan_cfg = adc_oneshot_config_channel(_adc_handle, _analog_pin, &channel_config);
    if (chan_cfg != ESP_OK) {
        ESP_LOGE(TAG, "Failed to configure ADC channel.");
        return false;
    }

    adc_oneshot_unit_init_cfg_t init_config = {
        .unit_id = ADC_UNIT_1,
        .clk_src = static_cast<adc_oneshot_clk_src_t>(ADC_DIGI_CLK_SRC_DEFAULT),
        .ulp_mode = ADC_ULP_MODE_DISABLE    
    };

    esp_err_t new_unit = adc_oneshot_new_unit(&init_config, &_adc_handle);
    if (new_unit != ESP_OK) {
        ESP_LOGE(TAG, "Failed to initialize ADC oneshot unit.");
        return false;
    }

    ESP_LOGI(TAG, "Smoke sensor started successfully.");
    return true;
}

int SmokeSensor::getSmokeLevel() {
    return _current_smoke_value;
}

void SmokeSensor::readSmokeLevel() {
    int adc_value = adc_oneshot_read(_adc_handle, _analog_pin, nullptr);

    if (adc_value == -1) {
        ESP_LOGE(TAG, "Failed to read ADC value.");
        return;
    }

    ESP_LOGI(TAG, "Raw ADC Value: %d", adc_value);
    _current_smoke_value = adc_value / 4095 * 100; // Convert to percentage
}

bool SmokeSensor::isSmokeDetected() {
    return _current_smoke_value >= _threshold;
}