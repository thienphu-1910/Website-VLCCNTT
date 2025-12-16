#ifndef _TEMPERATURE_SENSOR_H
#define _TEMPERATURE_SENSOR_H

#include "esp_adc/adc_oneshot.h"

class TemperatureSensor {
private:
    adc_oneshot_unit_handle_t _handler;
    adc_channel_t _pin;
    float _temperature;
public:
    TemperatureSensor(adc_channel_t pin);
    void start();
    float getTemperature();
};

#endif 