// #include <iostream>
// #include "esp_netif.h"
// #include "nvs_flash.h"
// #include "esp_event.h"
// #include "../config.h"

extern "C" {
    void app_main(void);
}

// #include <string.h>
// #include "freertos/FreeRTOS.h"
// #include "freertos/task.h"
// #include "freertos/event_groups.h"
// #include "esp_system.h"
// #include "esp_wifi.h"
// #include "esp_log.h"

// #include "lwip/err.h"
// #include "lwip/sys.h"

// // --- Configuration ---
// #define EXAMPLE_ESP_WIFI_SSID      "ngvtuatfm"
// #define EXAMPLE_ESP_WIFI_PASS      "ngvtuatfm0989224504"
// #define EXAMPLE_ESP_MAXIMUM_RETRY  5

// // Event group bits
// #define WIFI_CONNECTED_BIT BIT0
// #define WIFI_FAIL_BIT      BIT1

// static const char *TAG = "wifi station";
// static int s_retry_num = 0;

// /* FreeRTOS event group to signal when we are connected*/
// static EventGroupHandle_t s_wifi_event_group;

// // --- Event Handler ---
// // static void event_handler(void* arg, esp_event_base_t event_base,
// //                                 int32_t event_id, void* event_data)
// // {
// //     // Start the connection when Wi-Fi starts
// //     if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
// //         esp_wifi_connect();
// //     } 
// //     // Handle disconnection and retries
// //     else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
// //         if (s_retry_num < EXAMPLE_ESP_MAXIMUM_RETRY) {
// //             esp_wifi_connect();
// //             s_retry_num++;
// //             ESP_LOGI(TAG, "retry to connect to the AP");
// //         } else {
// //             xEventGroupSetBits(s_wifi_event_group, WIFI_FAIL_BIT);
// //         }
// //         ESP_LOGI(TAG,"connect to the AP fail");
// //     } 
// //     // Handle successful IP acquisition
// //     else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
// //         ip_event_got_ip_t* event = (ip_event_got_ip_t*) event_data;
// //         ESP_LOGI(TAG, "got ip:" IPSTR, IP2STR(&event->ip_info.ip));
// //         s_retry_num = 0;
// //         xEventGroupSetBits(s_wifi_event_group, WIFI_CONNECTED_BIT);
// //     }
// // }

// // // --- Wi-Fi Initialization Function ---
// // void wifi_init_sta(void)
// // {
// //     s_wifi_event_group = xEventGroupCreate();

// //     // Initialize the underlying TCP/IP stack
// //     ESP_ERROR_CHECK(esp_netif_init());

// //     // Create default event loop
// //     ESP_ERROR_CHECK(esp_event_loop_create_default());
// //     esp_netif_create_default_wifi_sta();

// //     wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
// //     ESP_ERROR_CHECK(esp_wifi_init(&cfg));

// //     // Register Event Handlers
// //     esp_event_handler_instance_t instance_any_id;
// //     esp_event_handler_instance_t instance_got_ip;
// //     ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
// //                                                         ESP_EVENT_ANY_ID,
// //                                                         &event_handler,
// //                                                         NULL,
// //                                                         &instance_any_id));
// //     ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT,
// //                                                         IP_EVENT_STA_GOT_IP,
// //                                                         &event_handler,
// //                                                         NULL,
// //                                                         &instance_got_ip));

// //     // Configure Wi-Fi credentials
// //     wifi_config_t wifi_config = {
// //         .sta = {
// //             .ssid = EXAMPLE_ESP_WIFI_SSID,
// //             .password = EXAMPLE_ESP_WIFI_PASS,
// //             /* Setting a password implies station will connect to all security modes including WEP/WPA.
// //              * However these modes are deprecated and not advised to be used. Incase your Access point
// //              * doesn't support WPA2, these mode can be enabled by commenting below line */
// //              .threshold = {
// //                 .authmode = WIFI_AUTH_WPA2_PSK,
// //              }
// //         },
// //     };
    
// //     ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA) );
// //     ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config) );
// //     ESP_ERROR_CHECK(esp_wifi_start() );

// //     ESP_LOGI(TAG, "wifi_init_sta finished.");

// //     /* Waiting until either the connection is established (WIFI_CONNECTED_BIT) or connection failed for the maximum
// //      * number of re-tries (WIFI_FAIL_BIT). The bits are set by event_handler() (see above) */
// //     EventBits_t bits = xEventGroupWaitBits(s_wifi_event_group,
// //             WIFI_CONNECTED_BIT | WIFI_FAIL_BIT,
// //             pdFALSE,
// //             pdFALSE,
// //             portMAX_DELAY);

// //     /* xEventGroupWaitBits() returns the bits before the call returned, hence we can test which event actually
// //      * happened. */
// //     if (bits & WIFI_CONNECTED_BIT) {
// //         ESP_LOGI(TAG, "connected to ap SSID:%s password:%s",
// //                  EXAMPLE_ESP_WIFI_SSID, EXAMPLE_ESP_WIFI_PASS);
// //     } else if (bits & WIFI_FAIL_BIT) {
// //         ESP_LOGI(TAG, "Failed to connect to SSID:%s, password:%s",
// //                  EXAMPLE_ESP_WIFI_SSID, EXAMPLE_ESP_WIFI_PASS);
// //     } else {
// //         ESP_LOGE(TAG, "UNEXPECTED EVENT");
// //     }
// // }

// void app_main(void) {
//     // // Init bộ nhớ flash
//     // ESP_ERROR_CHECK(nvs_flash_init());

//     // // Kết nối Wifi
//     // wifi_init_sta();
    
//     // // Khởi tạo Object MQTTClient (Hàm tạo sẽ kết nối với broker)
//     // MQTTClient mqtt_client(&mqtt_config);
    
//     // // Khai báo các thiết bị điện tử
//     // LED led(&led_config);
//     // Buzzer buzzer(&buzzer_config);

//     // Thermistor thermistor(&thermistor_config);
//     // FlameSensor flame_sensor(&flame_sensor_config);
//     // SmokeSensor smoke_sensor(&smoke_sensor_config);

//     // while (true) {
//     //     int smoke_sensor_value = smoke_sensor.getSensorValue();
//     //     bool has_smoke = smoke_sensor.hasSmoke();

//     //     float temperature = thermistor.temperature();
        
//     //     int flame_percentage = flame_sensor.getFlamePercentage();

//     //     if (has_smoke == true || temperature >= 57.0 || flame_percentage >= 30) {
//     //         for (int i = 0; i < 3; i++) {
//     //             led.blink();
//     //             buzzer.beep();
//     //         }
//     //     }

        

//     //     const char* data = mqtt_client.getData();
//     //     char* temp_data = new char(256);
//     //     strcpy(temp_data, data);

//     //     char* message = "";
//     //     strcpy(temp_data, message);
//     //     data = temp_data;

//     //     mqtt_client.data(data);
//     //     free(temp_data);
//     // }
// }