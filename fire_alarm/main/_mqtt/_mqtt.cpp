#include "_mqtt.hpp"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "../supersecretkey.h"

MQTTClient::MQTTClient(std::string broker_uri, std::string topic)
    : _uri(broker_uri), _client(nullptr), _topic(topic) {}

MQTTClient::~MQTTClient() {
    if (_client != nullptr) {
        esp_mqtt_client_destroy(_client);
    }
}

void MQTTClient::eventHandler(void* handler_args, esp_event_base_t base, int32_t event_id, void* event_data) {
    switch(static_cast<esp_mqtt_event_id_t>(event_id)) {
        case MQTT_CONNECTION_ACCEPTED:
            ESP_LOGI(TAG, "MQTT_EVENT_CONNECTED");
            break;
        case MQTT_EVENT_DISCONNECTED:
            ESP_LOGI(TAG, "MQTT_EVENT_DISCONNECTED");
            break;
        case MQTT_EVENT_PUBLISHED:
            ESP_LOGI(TAG, "MQTT_EVENT_PUBLISHED");
            break;
        default:
            ESP_LOGI(TAG, "Other event id: %d", event_id);
            break;
    }
}

bool MQTTClient::connect() {
    esp_mqtt_client_config_t config = {};
    config.broker.address.uri = _uri.c_str();
    config.broker.address.port = MQTT_PORT;

    config.credentials.username = MQTT_USERNAME;
    config.credentials.authentication.password = MQTT_PASSWORD;

    _client = esp_mqtt_client_init(&config);
    
    if (_client == nullptr) {
        ESP_LOGE(TAG, "Failed to initialize client");
        return false;
    }

    esp_err_t register_event = esp_mqtt_client_register_event(_client, static_cast<esp_mqtt_event_id_t>(ESP_EVENT_ANY_ID), eventHandler, nullptr);
    if (register_event != ESP_OK) {
        ESP_LOGE(TAG, "Failed to register event handler");
        return false;
    }

    ESP_LOGI(TAG, "Connecting to broker at %s", _uri.c_str());
    esp_err_t start_client = esp_mqtt_client_start(_client);

    if (start_client != ESP_OK) {
        ESP_LOGE(TAG, "Failed to start client");
        return false;   
    }

    ESP_LOGI(TAG, "Client started successfully");
    return true;
}

bool MQTTClient::publish(std::string message, int qos, int retain) {
    if (_client == nullptr) {
        ESP_LOGE(TAG, "Client not initialized");
        return false;
    }

    int message_id = esp_mqtt_client_publish(_client, _topic.c_str(), message.c_str(), message.length(), qos, retain);

    if (message_id == -1) {
        ESP_LOGE(TAG, "Failed to publish message");
        return false;
    }

    ESP_LOGI(TAG, "Message published with id: %d", message_id);
    vTaskDelay(10000 / portTICK_PERIOD_MS);

    return true;
}