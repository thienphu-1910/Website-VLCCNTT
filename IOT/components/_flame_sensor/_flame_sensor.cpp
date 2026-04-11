#include <math.h>
#include "esp_log.h"

#include "include/_flame_sensor.h"

// ADC Attenuation: 11dB allows measuring up to ~3.1V (perfect for 3.3V logic)
#define ADC_ATTEN           ADC_ATTEN_DB_12
#define ADC_BIT_WIDTH       ADC_BITWIDTH_12 // 0 to 4095
#define ADC_MAX_VALUE       4095
#define ADC_UNIT            ADC_UNIT_1

FlameSensor::FlameSensor(flame_sensor_config_t *config, adc_oneshot_unit_handle_t adc_handle) {
    if (config == NULL) {
        ESP_LOGE(TAG, "Failed to initialize: config is NULL");
        abort();
    }

    _config = *config;
    _adc_handle = adc_handle;

    adc_oneshot_chan_cfg_t channel_config = {
        .atten = config->adc_atten,
        .bitwidth = ADC_BITWIDTH_12,
    };

    ESP_ERROR_CHECK(adc_oneshot_config_channel(_adc_handle, config->adc_channel, &channel_config));
}

int FlameSensor::getFlamePercentage() {
    int raw_value = 0;
    
    // Read the raw voltage level (0 - 4095)
    ESP_ERROR_CHECK(adc_oneshot_read(_adc_handle, _config.adc_channel, &raw_value));
    
    // Convert to Percentage    
    int percentage = ((ADC_MAX_VALUE - raw_value) * 100) / ADC_MAX_VALUE;

    // Safety clamp
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    _latest_percentage = percentage;
    return percentage;
}

int FlameSensor::getLatestPercentage() {
    return _latest_percentage;
}