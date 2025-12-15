#include "driver/gpio.h"
#include "_smoke_sensor.h"

SmokeSensor::SmokeSensor(gpio_num_t pin) {
    _pin = pin;
}

void SmokeSensor::start() {
    gpio_config_t configuration = {};
    
    configuration.pin_bit_mask = (1ULL << _pin);// Shift bit 1 _pin lần -> bit thứ n bật == gpio n được config, bitwise để config nhiều cổng 1 lúc
    configuration.mode = GPIO_MODE_OUTPUT; // Set pin mode output
    configuration.pull_up_en = GPIO_PULLUP_DISABLE; // Default value khi chưa đọc là 0
    configuration.pull_down_en = GPIO_PULLDOWN_DISABLE;
    configuration.intr_type = GPIO_INTR_POSEDGE; // Interrupt CPU nếu value từ 0 -> 1

    ESP_ERROR_CHECK(gpio_config(&configuration));
}

int SmokeSensor::getSensorValue() {
    int value = gpio_get_level(_pin);

    return value;
}

void SmokeSensor::setSensorValue(int value) {
    _sensor_value = value;
}

bool SmokeSensor::hasSmoke() {
    return !_sensor_value;
}




