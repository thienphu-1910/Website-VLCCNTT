#ifndef _MQTT_HPP
#define _MQTT_HPP

#include <string>
#include "mqtt_client.h"

class MQTTClient {
private:
    inline static const char* TAG = "MQTTClient";
    std::string _uri;
    esp_mqtt_client_handle_t _client;
    std::string _topic;
    static void eventHandler(void* handler_args, esp_event_base_t base, int32_t event_id, void* event_data);
public:
    MQTTClient(std::string broker_uri, std::string topic);
    ~MQTTClient();
    bool connect();
    bool publish(std::string message, int qos, int retain);
};

#endif 