#ifndef CONFIG_HPP
#define CONFIG_HPP

#include "driver/gpio.h"

// Wifi Credentials:


// MQTT Credentials and Configs
#define MQTT_USERNAME "fire_alarm"
#define MQTT_PASSWORD "Mqtt_123123"
#define MQTT_BROKER_URI "83703ab394ea46a9ba860749f4ee5381.s1.eu.hivemq.cloud"
#define MQTT_TOPIC "fire_alarm/stats"
#define MQTT_PORT 8883
#define QOS 2
#define RETAIN 0

// LED Configs
#define BUZZER_PIN GPIO_NUM_32

// Buzzer Configs
#define BUZZER_PIN GPIO_NUM_33

// Smoke Sensor Configs
#define SMOKE_SENSOR_PIN GPIO_NUM_34 // GPIO34

// Flame Sensor Configs 
#define FLAME_SENSOR_PIN ADC_CHANNEL_7 // GPIO35

// Temperature Sensor Configs

#endif