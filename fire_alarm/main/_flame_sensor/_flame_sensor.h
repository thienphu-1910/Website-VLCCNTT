#ifndef _FLAME_SENSOR_H
#define _FLAME_SENSOR_H

#include "esp_adc/adc_oneshot.h"

class FlameSensor {
  private:
    adc_oneshot_unit_handle_t _adc_handle;
    adc_channel_t _adc_channel;
    int _latest_percentage;

  public:
    /**
     * @brief Constructor
     * @param channel The ADC channel corresponding to your pin
     * (e.g., ADC_CHANNEL_6 is often GPIO 34)
     */
    FlameSensor(adc_channel_t channel);
 
    void start();
    int getFlamePercentage();
    int getLatestPercentage();
};

#endif