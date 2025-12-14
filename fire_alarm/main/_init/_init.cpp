#include "_init.hpp"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "esp_event.h"

bool init() {
    const char* TAG = "INIT";

    esp_err_t flashInit = nvs_flash_init();
    if (flashInit != ESP_OK) {
        ESP_LOGE(TAG, "Failed to initialize NVS flash: %s", esp_err_to_name(flashInit));
        return false;
    }

    esp_err_t netifInit = esp_netif_init();
    if (netifInit != ESP_OK) {
        ESP_LOGE(TAG, "Failed to initialize network interfaces: %s", esp_err_to_name(netifInit));
        return false;
    }

    esp_err_t eventLoopInit = esp_event_loop_create_default();
    if (eventLoopInit != ESP_OK) {
        ESP_LOGE(TAG, "Failed to create default event loop: %s", esp_err_to_name(eventLoopInit));
        return false;
    }

    ESP_LOGI(TAG, "System initialization successful.");
    return true;
}