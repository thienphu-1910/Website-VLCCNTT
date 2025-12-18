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
    // Init bộ nhớ flash
    ESP_ERROR_CHECK(nvs_flash_init());

    // Kết nối Wifi
    bool status = WiFiStation::instance()->connect_wifi();
    if (true != status) {
        ESP_LOGE(WiFiStation::instance()->tag(), "Failed to connect to WiFi");
        abort();
    }

    // Khởi tạo Object MQTTClient (Hàm tạo sẽ kết nối với broker)
    MQTTClient mqtt_client(&mqtt_config);
    
    // Khai báo các thiết bị điện tử
    LED led(&led_config);
    Buzzer buzzer(&buzzer_config);

    Thermistor thermistor(&thermistor_config);
    FlameSensor flame_sensor(&flame_sensor_config);
    SmokeSensor smoke_sensor(&smoke_sensor_config);

    while (true) {
        int smoke_sensor_value = smoke_sensor.getSensorValue();
        bool has_smoke = smoke_sensor.hasSmoke();

        float temperature = thermistor.temperature();
        
        int flame_percentage = flame_sensor.getFlamePercentage();

        if (has_smoke == true && temperature >= 57.0 && flame_percentage >= 30) {
            for (int i = 0; i < 3; i++) {
                led.blink();
                buzzer.beep();
            }
        }

        if (mqtt_client.buzzer_trigger == 1) {
            buzzer.beep();
        }

        if (mqtt_client.light_trigger == 1) {
            led.blink();
        }

        int trigger = mqtt_client.buzzer_trigger || mqtt_client.light_trigger;

        cJSON *root = cJSON_CreateObject();
        cJSON_AddStringToObject(root, "deviceId", DEVICEID);
        cJSON_AddNumberToObject(root, "temperature", temperature);
        cJSON_AddNumberToObject(root, "smoke", has_smoke);
        cJSON_AddNumberToObject(root, "flame", flame_percentage);
        cJSON_AddNumberToObject(root, "manual", trigger);

        char* json_string = cJSON_PrintUnformatted(root);
        mqtt_client.data(json_string);

        if (mqtt_client.publish() == true) {
            std::cout << "Send success";
        }

        cJSON_Delete(root);
        delete json_string;

        vTaskDelay(5000 / portTICK_PERIOD_MS);
    }
}