#ifndef _FLAME_SENSOR_H
#define _FLAME_SENSOR_H

#include "esp_adc/adc_oneshot.h"

typedef struct  {
  adc_unit_t adc_unit;
  adc_atten_t adc_atten;
  adc_channel_t adc_channel;
} flame_sensor_config_t;

class FlameSensor {
  private:
    const char* TAG = "FlameSensor";

    flame_sensor_config_t _config;
    adc_oneshot_unit_handle_t _adc_handle;
    int _latest_percentage;

  public:
    /**
     * @brief Constructor
     * @param channel The ADC channel corresponding to your pin
     * (e.g., ADC_CHANNEL_6 is often GPIO 34)
     */
    FlameSensor(flame_sensor_config_t *config);
    ~FlameSensor();
    int getFlamePercentage();
    int getLatestPercentage();
};

#endif