#ifndef _SMOKE_SENSOR_HPP
#define _SMOKE_SENSOR_HPP

#include "esp_adc/adc_oneshot.h" 

class SmokeSensor {
private:
    const char* TAG = "SmokeSensor";
    adc_oneshot_unit_handle_t _adc_handle;
    adc_channel_t _analog_pin;
    int _threshold; // in percentage
    int _current_smoke_value;
public:
    SmokeSensor(adc_channel_t analog_pin, int threshold);
    ~SmokeSensor();
    bool start();
    int getSmokeLevel();
    void readSmokeLevel();
    bool isSmokeDetected();
};

#endif