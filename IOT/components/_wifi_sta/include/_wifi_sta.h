#ifndef _WIFI_STA_H
#define _WIFI_STA_H

#include "esp_mac.h"
#include "esp_err.h"
#include "FreeRTOS/event_groups.h"

esp_err_t wifi_sta_init(EventGroupHandle_t event_group);
esp_err_t wifi_sta_stop();
esp_err_t wifi_sta_reconnect();

#endif