#include <iostream>
#include "nvs_flash.h"
#include "esp_netif.h"
#include "esp_event.h"
#include "init.hpp"

bool init_esp_setup() {
    esp_err_t flash = nvs_flash_init();

    if (flash != ESP_OK) {
        std::cout << "NVS Flash Init Failed!" << std::endl;
        return false;
    }

    esp_err_t netif = esp_netif_init();
    if (netif != ESP_OK) {
        std::cout << "ESP Netif Init Failed!" << std::endl;
        return false;
    }

    esp_err_t loop = esp_event_loop_create_default();
    if (loop != ESP_OK) {
        std::cout << "ESP Event Loop Creation Failed!" << std::endl;
        return false;
    }

    return true;
}