#ifndef _THERMISTOR_H
#define _THERMISTOR_H

#include "esp_adc/adc_cali.h"
#include "esp_adc/adc_oneshot.h"

typedef struct {
    adc_atten_t atten;
    adc_channel_t channel;
    uint32_t b_value;
    uint32_t vdd_mv;
    uint32_t r25_ohm;
    uint32_t fixed_ohm;
} thermistor_config_t;

class Thermistor {
private:
    const char *TAG = "Thermistor";

    thermistor_config_t _config;
    adc_cali_handle_t _adc_cali_handle;
    adc_oneshot_unit_handle_t _adc_handle;
public:
    Thermistor(const thermistor_config_t *config, adc_oneshot_unit_handle_t adc_handle);
    ~Thermistor();

    float temperature();
};

#endif