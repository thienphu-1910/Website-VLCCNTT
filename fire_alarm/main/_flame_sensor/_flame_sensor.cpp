#include <math.h>
#include "_flame_sensor.h"
#include "esp_log.h"

// ADC Attenuation: 11dB allows measuring up to ~3.1V (perfect for 3.3V logic)
#define ADC_ATTEN           ADC_ATTEN_DB_12
#define ADC_BIT_WIDTH       ADC_BITWIDTH_12 // 0 to 4095
#define ADC_MAX_VALUE       4095
#define ADC_UNIT            ADC_UNIT_1

FlameSensor::FlameSensor(adc_channel_t channel) {
    _adc_channel = channel;
    _adc_handle = NULL;
    _latest_percentage = 0;
}

void FlameSensor::start() {
  // 1. Configure the ADC Unit (The Hardware Wrapper)
  adc_oneshot_unit_init_cfg_t init_config = {};
  init_config.unit_id = ADC_UNIT;
  init_config.clk_src = ADC_RTC_CLK_SRC_DEFAULT;
  ESP_ERROR_CHECK(adc_oneshot_new_unit(&init_config, &_adc_handle));

  // 2. Configure the specific Channel (The Pin)
  adc_oneshot_chan_cfg_t config = {};
  config.bitwidth = ADC_BIT_WIDTH;
  config.atten = ADC_ATTEN;  
  
  ESP_ERROR_CHECK(adc_oneshot_config_channel(_adc_handle, _adc_channel, &config));
}

int FlameSensor::getFlamePercentage() {
  int raw_value = 0;
  
  // Read the raw voltage level (0 - 4095)
  ESP_ERROR_CHECK(adc_oneshot_read(_adc_handle, _adc_channel, &raw_value));
  
  // Convert to Percentage    
  int percentage = (raw_value * 100) / ADC_MAX_VALUE;

  // Safety clamp
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;

  _latest_percentage = percentage;
  return percentage;
}

int FlameSensor::getLatestPercentage() {
  return _latest_percentage;
}