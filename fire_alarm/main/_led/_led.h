#ifndef _LED_H
#define _LED_H

#include "driver/gpio.h"

typedef struct {
    gpio_num_t pin;
    int blink_times;
} led_config_t;

class LED {
private:
    const char* TAG = "LED";
    led_config_t _config;
public:
    LED(led_config_t *config);
    void blink();
};

#endif
