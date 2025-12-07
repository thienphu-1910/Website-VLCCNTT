#include <iostream>
#include "_mqtt.hpp"

MQTTHandler::MQTTHandler(const std::string &uri) {
    _uri = uri;
    _client = nullptr;
}

MQTTHandler::~MQTTHandler() {
    stop();
}

void MQTTHandler::start() {
    esp_mqtt_client_config_t mqtt_config = {
        .broker.address.uri = _uri.c_str()
    };

    _client = esp_mqtt_client_init(&mqtt_config);

    if (_client == nullptr) {
        std::cerr << "Failed to initialize MQTT client" << std::endl;
        return;
    }

    esp_mqtt_client_register_event(_client, MQTT_EVENT_ANY, mqtt_event_handler, this);
    esp_mqtt_client_start(_client);
}

int MQTTHandler::publish(const std::string &topic, const std::string &message, int qos, int retain) {
    if (_client == nullptr) {
        std::cerr << "MQTT client is not started" << std::endl;
        return -1;
    }

    int msg_id = esp_mqtt_client_publish(_client, topic.c_str(), message.c_str(), message.length(), qos, retain);
    return msg_id;
}

void MQTTHandler::stop() {
    if (_client == nullptr) {
        return;
    }
    esp_mqtt_client_stop(_client);
    esp_mqtt_client_destroy(_client);
    _client = nullptr;
}

void MQTTHandler::mqtt_event_handler(void * handler_args, esp_event_base_t base, int32_t event_id, void * event_data) {
    MQTTHandler* mqtt_handler = static_cast<MQTTHandler*>(handler_args);
    
    if (mqtt_handler) {
        mqtt_handler->handle_event(event_id, event_data);
    }
}

void MQTTHandler::handle_event(int32_t event_id, void *event_data) {
    esp_mqtt_event_handle_t event = static_cast<esp_mqtt_event_handle_t>(event_data);

    switch (static_cast<esp_mqtt_event_id_t>(event_id)) {
    case MQTT_EVENT_CONNECTED:
        std::cout << "MQTT_EVENT_CONNECTED" << std::endl;
        break;
    case MQTT_EVENT_DISCONNECTED:
        std::cout << "MQTT_EVENT_DISCONNECTED" << std::endl;
        break;
    case MQTT_EVENT_ERROR:
        std::cout << "MQTT_EVENT_ERROR" << std::endl;
        if (event->error_handle->error_type == MQTT_ERROR_TYPE_TCP_TRANSPORT) {
            std::cout << "Last error code reported from esp-tls: " << event->error_handle->esp_tls_last_esp_err << std::endl;
            std::cout << "Last esp error code: " << event->error_handle->esp_tls_last_esp_err << std::endl;
        }
    default:
        std::cout << "Other event id: " << event_id << std::endl;
        break;
    }
}