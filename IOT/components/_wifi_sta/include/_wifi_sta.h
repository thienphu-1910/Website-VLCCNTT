#ifndef _WIFI_STA_H
#define _WIFI_STA_H

#include "esp_mac.h"
#include "esp_err.h"
#include "FreeRTOS/event_groups.h"
#include "esp_event.h"

class WiFiStation {
private:
    inline static WiFiStation *_instance = nullptr;
    WiFiStation();
private:
    inline static int _retry_num = 0;
    inline static const char *TAG = "WiFi";

    inline static EventGroupHandle_t _wifi_event_group = NULL;

    static void _wifiEventHandler(void* arg, esp_event_base_t event_base, int32_t event_id, void* event_data);
    static void _ipEventHandler(void* arg, esp_event_base_t event_base, int32_t event_id, void* event_data);
public:
    static WiFiStation* instance();
    ~WiFiStation();
    
    static bool connect_wifi();
    static const char* tag();
};

#endif