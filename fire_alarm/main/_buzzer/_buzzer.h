#ifndef _BUZZER_H
#define _BUZZER_H

#include "driver/gpio.h"

typedef struct {
    gpio_num_t pin;
} buzzer_config_t;

class Buzzer {
private:
    const char* TAG = "Buzzer";
    buzzer_config_t _config;

public:
    Buzzer(const buzzer_config_t *config);
    void beep(int times);
};

#endif 