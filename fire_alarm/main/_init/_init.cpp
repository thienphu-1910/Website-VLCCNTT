#include "_init.hpp"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "esp_event.h"

bool init() {
    const char* TAG = "INIT";

    esp_err_t flash_init = nvs_flash_init();
    if (flash_init != ESP_OK) {
        ESP_LOGE(TAG, "Failed to initialize NVS flash: %s", esp_err_to_name(flash_init));
        return false;
    }

    esp_err_t netif_init = esp_netif_init();
    if (netif_init != ESP_OK) {
        ESP_LOGE(TAG, "Failed to initialize network interfaces: %s", esp_err_to_name(netif_init));
        return false;
    }

    esp_err_t event_loop_init = esp_event_loop_create_default();
    if (event_loop_init != ESP_OK) {
        ESP_LOGE(TAG, "Failed to create default event loop: %s", esp_err_to_name(event_loop_init));
        return false;
    }

    ESP_LOGI(TAG, "System initialization successful.");
    return true;
}