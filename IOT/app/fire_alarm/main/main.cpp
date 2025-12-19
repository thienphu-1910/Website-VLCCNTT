#include <iostream>
#include <string>
#include "esp_netif.h"
#include "nvs_flash.h"
#include "esp_event.h"
#include "cJSON.h"
#include "esp_log.h"

#include "config.h"

extern "C" {
    void app_main(void);
}

void app_main(void) {
    ESP_ERROR_CHECK(nvs_flash_init());

    bool status = WiFiStation::instance()->connect_wifi();
    if (true != status) {
        ESP_LOGE(WiFiStation::instance()->tag(), "Failed to connect to WiFi");
        abort();
    }

    MQTTClient mqtt_client(&mqtt_config);
    Buzzer buzzer(&buzzer_config);

    while (true) {
        if (mqtt_client.buzzer_trigger == 1) {
            buzzer.beep();
        }
        mqtt_client.buzzer_trigger = 0;

        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}