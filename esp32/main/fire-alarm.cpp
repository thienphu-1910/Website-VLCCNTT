#include <stdio.h>
#include <string>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/event_groups.h"
#include "nvs_flash.h"
#include "_mqtt/_mqtt.hpp"
#include  "smoke_sensor/smoke-sensor.hpp"


void app_main(void)
{
    

    std::string mqtt_uri = "";
    SmokeSensor smokeSensor(34);
    MQTTHandler mqttHandler(mqtt_uri);
}
