#include "_buzzer.h"

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"

Buzzer::Buzzer(const buzzer_config_t *config) {
    if (config == NULL) {
        ESP_LOGE(TAG, "arg is invalid");
        abort();
    }

    _config = *config;
    gpio_config_t buzzer_config = {
        .pin_bit_mask = (1ULL << config->pin),
        .mode = GPIO_MODE_OUTPUT,
        .pull_up_en = GPIO_PULLUP_DISABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .intr_type = GPIO_INTR_DISABLE,
    };
    ESP_ERROR_CHECK(gpio_config(&buzzer_config));
}

void Buzzer::beep() {
    for (int i = 0; i < _config.beep_times; i++) {
        gpio_set_level(_config.pin, 1);
        vTaskDelay(100 / portTICK_PERIOD_MS);

        gpio_set_level(_config.pin, 0);
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}