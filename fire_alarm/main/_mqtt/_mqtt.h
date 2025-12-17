#ifndef _MQTT_H
#define _MQTT_H

#include <string>
#include "esp_event.h"
#include "mqtt_client.h"

typedef struct {
    const char* broker_uri;
    const char* topic;
    const char* data;
    const char* username;
    const char* password;
    int port;
    int qos;
    int retain;
} mqtt_config_t;

class MQTTClient {
private:
    inline static const char* TAG = "MQTT Client";
    esp_mqtt_client_handle_t _client;
    static mqtt_config_t _config;
public:
    MQTTClient(mqtt_config_t* config);
    ~MQTTClient();
    bool publish();
    void data(const char* data);

    static void mqtt_event_handler(void* hanlder_args, esp_event_base_t base, int32_t event_id, void *event_data);
};

#endif