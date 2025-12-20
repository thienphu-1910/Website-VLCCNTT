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

    vTaskDelay(500 / portTICK_PERIOD_MS);

    MQTTClient mqtt_client(&mqtt_config);
    vTaskDelay(500 / portTICK_PERIOD_MS);

    Buzzer buzzer(&buzzer_config);
    LED led(&led_config);
    vTaskDelay(500 / portTICK_PERIOD_MS);

    adc_oneshot_unit_handle_t adc_handle;
    adc_oneshot_unit_init_cfg_t config = {
        .unit_id = ADC_UNIT_1,
    };

    ESP_ERROR_CHECK(adc_oneshot_new_unit(&config, &adc_handle));

    SmokeSensor smoke_sensor(&smoke_sensor_config);
    FlameSensor flame_sensor(&flame_sensor_config, adc_handle);
    Thermistor thermistor(&thermistor_config, adc_handle);
    vTaskDelay(500 / portTICK_PERIOD_MS);

    while (true) {
        int smoke_sensor_value = smoke_sensor.getSensorValue();
        int flame_percentage = flame_sensor.getFlamePercentage();
        int temperature_value = thermistor.temperature();

        int buzzer_trigger = mqtt_client.buzzer_trigger;
        int light_trigger = mqtt_client.light_trigger;
        int trigger_type = 0;

        if (smoke_sensor_value >= smoke_sensor_config.threshold && 
            flame_percentage >= flame_sensor_config.threshold &&
            temperature_value >= thermistor_config.threshold) 
        {
            for (int i = 0; i < 3; i++) {
                buzzer.beep();
                led.blink();
            }
            trigger_type = 2;
        }

        if (buzzer_trigger == 1) {
            buzzer.beep();
            mqtt_client.buzzer_trigger = 0;

            trigger_type = 1;
        }

        if (light_trigger == 1) {
            led.blink();
            mqtt_client.light_trigger = 0;

            trigger_type = 1;
        }

        cJSON* root = cJSON_CreateObject();
        cJSON_AddNumberToObject(root, "deviceId", 1);
        cJSON_AddNumberToObject(root, "triggerType", trigger_type);
        cJSON_AddNumberToObject(root, "temperature", temperature_value);
        cJSON_AddNumberToObject(root, "smoke", smoke_sensor_value);
        cJSON_AddNumberToObject(root, "flame", flame_percentage);

        char* json_to_send = cJSON_PrintUnformatted(root);
        mqtt_client.data(json_to_send);
        
        bool status = mqtt_client.publish();
        if (status == false) {
            ESP_LOGE(mqtt_client.getTag(), "Publish Failed.");
            abort();
        }

        cJSON_Delete(root);
        delete json_to_send;
            
        vTaskDelay(5000 / portTICK_PERIOD_MS);
    }
}