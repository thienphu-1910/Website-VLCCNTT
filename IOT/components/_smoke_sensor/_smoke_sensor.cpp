#include "esp_log.h"

#include "include/_smoke_sensor.h"

SmokeSensor::SmokeSensor(smoke_sensor_config_t *config) {
    if (config == NULL) {
        ESP_LOGE(TAG, "Failed to initialize: config is NULL.");
        abort();
    }

    _config = *config;
    gpio_config_t configurations = {
        .pin_bit_mask = (1ULL << config->pin),
        .mode = GPIO_MODE_OUTPUT,
        .pull_up_en = GPIO_PULLUP_DISABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .intr_type = GPIO_INTR_POSEDGE,
    };

    ESP_ERROR_CHECK(gpio_config(&configurations));
}

int SmokeSensor::getSensorValue() {
    int value = gpio_get_level(_config.pin);
    _sensor_value = value;
    return value;
}

bool SmokeSensor::hasSmoke() {
    return _sensor_value;
}