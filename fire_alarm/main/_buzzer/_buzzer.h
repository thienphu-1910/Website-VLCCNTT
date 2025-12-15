#ifndef _BUZZER_H
#define _BUZZER_H

#include "driver/gpio.h"

class Buzzer {
private:
    const char* TAG = "Buzzer";
    gpio_num_t _pin;
public:
    Buzzer(gpio_num_t pin);
    void start();
    void beep(int times);
};

#endif 