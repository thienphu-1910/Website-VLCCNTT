#include "_buzzer.h"
#include "freertos/task.h"
#include "freertos/FreeRTOS.h"

Buzzer::Buzzer(gpio_num_t pin) {
    _pin = pin;
}

void Buzzer::start() {
    gpio_config_t buzzer_config = {};

    buzzer_config.mode = GPIO_MODE_OUTPUT;
    buzzer_config.pin_bit_mask = (1ULL << _pin);
    buzzer_config.pull_up_en = GPIO_PULLUP_DISABLE;
    buzzer_config.pull_down_en = GPIO_PULLDOWN_DISABLE;
    buzzer_config.intr_type = GPIO_INTR_DISABLE;

    ESP_ERROR_CHECK(gpio_config(&buzzer_config));
}

void Buzzer::beep(int times) {
    for (int i = 0; i < times; i++) {
        gpio_set_level(_pin, 1);
        vTaskDelay(100 / portTICK_PERIOD_MS);

        gpio_set_level(_pin, 0);
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}