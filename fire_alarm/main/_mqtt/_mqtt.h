#ifndef _MQTT_H
#define _MQTT_H

#include <string>
#include "esp_event.h"
#include "mqtt_client.h"

class MQTTClient {
private:
    inline static const char* TAG = "MQTT Client";
    esp_mqtt_client_handle_t _client;
    static const char* _topic;
    const char* _broker_uri;
    static const char* _data;
public:
    MQTTClient(const char* broker_uri);
    ~MQTTClient();
    inline static void mqtt_event_handler(void* hanlder_args, esp_event_base_t base, int32_t event_id, void *event_data);
    void setData(const char* data);
    void setTopic(const char* topic);
    void start();
    bool publish();
};

#endif