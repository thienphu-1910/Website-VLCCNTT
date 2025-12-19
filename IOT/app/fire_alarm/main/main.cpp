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
    vTaskDelay(3000 / portTICK_PERIOD_MS);

    MQTTClient mqtt_client(&mqtt_config);
    vTaskDelay(3000 / portTICK_PERIOD_MS);

    Buzzer buzzer(&buzzer_config);
    LED led(&led_config);
    vTaskDelay(3000 / portTICK_PERIOD_MS);
    adc_oneshot_unit_handle_t adc_handle;
    adc_oneshot_unit_init_cfg_t config = {
        .unit_id = ADC_UNIT_1,
    };

    ESP_ERROR_CHECK(adc_oneshot_new_unit(&config, &adc_handle));
    vTaskDelay(3000 / portTICK_PERIOD_MS);
    SmokeSensor smoke_sensor(&smoke_sensor_config);
    FlameSensor flame_sensor(&flame_sensor_config, adc_handle);
    Thermistor thermistor(&thermistor_config, adc_handle);

    buzzer.beep();

    vTaskDelay(500 / portTICK_PERIOD_MS);

    led.blink();

    vTaskDelay(500 / portTICK_PERIOD_MS);

    std::cout << smoke_sensor.getSensorValue() << std::endl;
    vTaskDelay(500 / portTICK_PERIOD_MS);
    std::cout << flame_sensor.getFlamePercentage() << std::endl;
    vTaskDelay(500 / portTICK_PERIOD_MS);
    std::cout << thermistor.temperature() << std::endl;
    vTaskDelay(3000 / portTICK_PERIOD_MS);
}