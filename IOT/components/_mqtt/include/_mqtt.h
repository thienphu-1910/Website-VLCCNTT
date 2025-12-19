#ifndef _MQTT_H
#define _MQTT_H

#include <string>
#include "esp_event.h"
#include "mqtt_client.h"

typedef struct {
    const char* broker_uri;
    const char* topic;
    const char* subscribe_topic[2];
    const char* data;
    const char* username;
    const char* password;
    int port;
    int qos;
    int retain;
} mqtt_config_t;

class MQTTClient {
private:
    inline static const char* TAG = "MQTTClient";
    esp_mqtt_client_handle_t _client;
    static mqtt_config_t _config;
public:
    inline static volatile int light_trigger = 0;
    inline static volatile int buzzer_trigger = 0;

    MQTTClient(mqtt_config_t* config);
    ~MQTTClient();
    bool publish();
    void data(const char* data);
    const char* getData();

    static void mqtt_event_handler(void* hanlder_args, esp_event_base_t base, int32_t event_id, void *event_data);
};

#endif