#ifndef _LED_H
#define _LED_H

#include "driver/gpio.h"

class LED {
private:
    gpio_num_t _pin;
public:
    LED(gpio_num_t pin);
    void start();
    void blink(int times);
};

#endif
