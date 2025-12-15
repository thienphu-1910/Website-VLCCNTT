#include "_led.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

LED::LED(gpio_num_t pin) {
    _pin = pin;
}

void LED::start() {
    gpio_config_t led_config = {};
    
    led_config.pin_bit_mask = (1ULL << _pin);
    led_config.mode = GPIO_MODE_OUTPUT;
    led_config.pull_up_en = GPIO_PULLUP_DISABLE;
    led_config.pull_down_en = GPIO_PULLDOWN_DISABLE;
    led_config.intr_type = GPIO_INTR_DISABLE;

    ESP_ERROR_CHECK(gpio_config(&led_config));
}

void LED::blink(int times) {
    for (int i = 0; i < times; i++) {
        gpio_set_level(_pin, 1);
        vTaskDelay(500 / portTICK_PERIOD_MS);

        gpio_set_level(_pin, 0);
        vTaskDelay(500 / portTICK_PERIOD_MS);
    }
}