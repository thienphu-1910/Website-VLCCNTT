#include <stdio.h>
#include <string>
#include <iostream>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/event_groups.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "_mqtt.hpp"
#include  "smoke-sensor.hpp"
#include "init.hpp"


void app_main(void) { 
    // Initialize ESP Setup
    bool init_success = init_esp_setup();

    if (init_success == false) {
        std::cout << "ESP Setup Initialization Failed!" << std::endl;
        return;
    }

    // Initialize Smoke Sensor on analog pin 34
    SmokeSensor smokeSensor(34, "Device001");

    // Connect Wifi here

    // Initialize MQTT Handler
    std::string mqtt_uri = "";
    MQTTHandler mqttHandler(mqtt_uri);
    mqttHandler.start();

    while (true) {
        smokeSensor.setSmokeLevel();
        int smokeLevel = smokeSensor.getSmokeLevel();
        std::string topic = "home/fire/smoke";
        std::string message = "Smoke Level: " + std::to_string(smokeLevel) + " PPM";
        int qos = 1;
        int retain = 0;
        mqttHandler.publish(topic, message, qos, retain);
        vTaskDelay(5000 / portTICK_PERIOD_MS);
    }
}
