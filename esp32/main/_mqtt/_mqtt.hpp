#pragma once

#include <string>
#include "mqtt_client.h"


class MQTTHandler {
    private:
        esp_mqtt_client_handle_t _client;
        std::string _uri;

        static void mqtt_event_handler(void *handler_args, esp_event_base_t base, int32_t event_id, void *event_data);
        void handle_event(int32_t event_id, void *event_data);
    public:
        MQTTHandler(const std::string &uri);
        ~MQTTHandler();
        void start();
        int publish(const std::string &topic, const std::string &message, int qos, int retain);
        void stop();
};

