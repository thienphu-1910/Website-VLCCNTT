#include <iostream>
#include "../config.h"
#include "esp_netif.h"
#include "nvs_flash.h"
#include "esp_event.h"
#include "_led/_led.h"
#include "_buzzer/_buzzer.h"
#include "_smoke_sensor/_smoke_sensor.h"
#include "_thermistor/_thermistor.h"
#include "_flame_sensor/_flame_sensor.h"
#include "_mqtt/_mqtt.h"

extern "C" {
    void app_main(void);
}

void app_main(void) {
    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    
}

