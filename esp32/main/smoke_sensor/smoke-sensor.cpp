#include <iostream>
#include <vector>
#include <cmath>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "smoke-sensor.hpp"
#include "driver/gpio.h"
#include "driver/adc.h"

SmokeSensor::SmokeSensor(int sensorPin, std::string deviceId) : _deviceId(deviceId) {
    std::vector<int> invalidPins = {1, 2, 3, 4, 6, 7, 9, 19, 26, 37};

    if (sensorPin < 0 || sensorPin > 42) {
        std::cerr << "Error: Invalid pin number" << std::endl;
        return;
    }

    for (int pin : invalidPins) {
        if (sensorPin == pin) {
            std::cerr << "Error: Pin " << sensorPin << " cannot be used for analog input" << std::endl;
            return;
        }
    }

    _sensorPin = sensorPin;
    _smokeLevel = 0;
    gpio_set_direction(static_cast<gpio_num_t>(_sensorPin), GPIO_MODE_OUTPUT);
}

SmokeSensor::~SmokeSensor() {
    std::cout << "Smoke Sensor is ded lah" << std::endl;
}

float SmokeSensor::calculateResistance(int analogValue) {
    if (analogValue == 0) {
        return 99999.0f; // Avoid division by zero
    }

    float inputVoltage = 3.3f;
    float voltage = analogValue * 3.3 / 4095.0f;

    return ((3.3 - voltage) / voltage) * LOAD_RES;
}

float SmokeSensor::calibrateSensor(float resistance) {
    float value = 0;

    for (int i = 0; i < CYCLE; i++) {
        value += calculateResistance(adc1_get_raw(static_cast<adc1_channel_t>(_sensorPin)));
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
    value = value / CYCLE;

    return value / CALIBRATION_FACTOR;
}

int SmokeSensor::convertToPPM(int analogValue) {
    float resistance = calculateResistance(analogValue);
    float calibratedValue = calibrateSensor(resistance);

    float ratio = resistance / R0;
    float ppm = CURVE_A * pow(ratio, CURVE_B);
    return static_cast<int>(ppm);
}

void SmokeSensor::setSmokeLevel() {
    int analogValue = adc1_get_raw(static_cast<adc1_channel_t>(_sensorPin));
    _smokeLevel = convertToPPM(analogValue);
}

int SmokeSensor::getSmokeLevel() {
    return _smokeLevel;
}