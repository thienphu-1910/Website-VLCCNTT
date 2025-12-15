#ifndef _SMOKE_SENSOR_H
#define _SMOKE_SENSOR_H

class SmokeSensor {
private:
    inline static const char* TAG = "Smoke Sensor";
    gpio_num_t _pin;
    int _sensor_value;
public:
    SmokeSensor(gpio_num_t pin);
    void start();
    int getSensorValue();
    void setSensorValue(int value);
    bool hasSmoke();
};

#endif