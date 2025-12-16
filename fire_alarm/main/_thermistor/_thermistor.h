#ifndef _THERMISTOR_H
#define _THERMISTOR_H

#include "esp_adc/adc_oneshot.h"
#include "esp_adc/adc_cali.h"

class Thermistor {
private:
    inline static const char *TAG = "Thermistor";

    uint32_t _b_value = 3950;
    uint32_t _r25_ohm = 10000;
    uint32_t _fixed_ohm = 10000;
    uint32_t _vdd_mv = 3300;

    adc_channel_t _channel;
    adc_oneshot_unit_handle_t _adc_handle;
    adc_cali_handle_t _adc_cali_handle;
public:
    Thermistor(adc_channel_t channel);
    
    void start();
    float temperature();
};

#endif