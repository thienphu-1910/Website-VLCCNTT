#include "esp_wifi.h"
#include "esp_netif.h"
#include "esp_log.h"

#include "include/_wifi_sta.h"

WiFiStation::WiFiStation() {}

WiFiStation* WiFiStation::instance() {
    if (_instance == nullptr) {
        _instance = new WiFiStation();
    }
    return _instance; 
}

WiFiStation::~WiFiStation() {
    if (_instance != nullptr) {
        delete _instance;
        _instance = nullptr;
    }
}

void WiFiStation::_wifiEventHandler(void* arg, esp_event_base_t event_base, int32_t event_id, void* event_data) {
    if (event_base == WIFI_EVENT) {
        switch (event_id) {
        case WIFI_EVENT_STA_START:
            ESP_LOGI(TAG, "Connecting to AP...");
            esp_wifi_connect();

            break;

        case WIFI_EVENT_STA_DISCONNECTED:
            if (_retry_num < 10) {
                ESP_LOGI(TAG, "Reconnecting to AP...");
                esp_wifi_connect();
                ++_retry_num;
            } 
            else {
                xEventGroupSetBits(_wifi_event_group, BIT0);
            }

            break;
        }
    }
}

void WiFiStation::_ipEventHandler(void* arg, esp_event_base_t event_base, int32_t event_id, void* event_data) {
	if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        ip_event_got_ip_t* event = (ip_event_got_ip_t*) event_data;

        ESP_LOGI(TAG, "STA IP: " IPSTR, IP2STR(&event->ip_info.ip));

        _retry_num = 0;

        xEventGroupSetBits(_wifi_event_group, BIT1);
    }
}

bool WiFiStation::connect_wifi() {
	bool status = false;

	ESP_ERROR_CHECK(esp_netif_init());
	ESP_ERROR_CHECK(esp_event_loop_create_default());

	esp_netif_create_default_wifi_sta();
	wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

	_wifi_event_group = xEventGroupCreate();
    esp_event_handler_instance_t wifi_event_handler;
    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
                                                        ESP_EVENT_ANY_ID,
                                                        &_wifiEventHandler,
                                                        NULL,
                                                        &wifi_event_handler));

    esp_event_handler_instance_t ip_event_handler;
    ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT,
                                                        IP_EVENT_STA_GOT_IP,
                                                        &_ipEventHandler,
                                                        NULL,
                                                        &ip_event_handler));

    wifi_config_t wifi_config = {
        .sta = {
            .ssid = CONFIG_WIFI_STA_SSID,
            .password = CONFIG_WIFI_STA_PASSWORD,
	        .threshold = {
                .authmode = WIFI_AUTH_WPA2_PSK,
            },
            .pmf_cfg = {
                .capable = true,
                .required = false
            },
        },
    };

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA) );
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());

    ESP_LOGI(TAG, "STA initialization complete");

    EventBits_t bits = xEventGroupWaitBits(_wifi_event_group,
            BIT0 | BIT1,
            pdFALSE,
            pdFALSE,
            portMAX_DELAY);

    if (bits & BIT1) {
        ESP_LOGI(TAG, "Connected to AP");
        status = true;
    } else if (bits & BIT0) {
        ESP_LOGI(TAG, "Failed to connect to AP");
        status = false;
    } else {
        ESP_LOGE(TAG, "Unexpected event occured");
        status = false;
    }

    ESP_ERROR_CHECK(esp_event_handler_instance_unregister(IP_EVENT, IP_EVENT_STA_GOT_IP, ip_event_handler));
    ESP_ERROR_CHECK(esp_event_handler_instance_unregister(WIFI_EVENT, ESP_EVENT_ANY_ID, wifi_event_handler));
    vEventGroupDelete(_wifi_event_group);

    return status;
}