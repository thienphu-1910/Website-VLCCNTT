#ifndef _SMOKE_SENSOR_H
#define _SMOKE_SENSOR_H

typedef struct {
    gpio_num_t pin;
} smoke_sensor_config_t;

class SmokeSensor {
private:
    inline static const char* TAG = "Smoke Sensor";
    smoke_sensor_config_t _config;

    int _sensor_value;
public:
    SmokeSensor(smoke_sensor_config_t *config);
    int getSensorValue();
    bool hasSmoke();
};

#endif