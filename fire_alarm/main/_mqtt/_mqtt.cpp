#include "_mqtt.h"
#include "esp_log.h"
#include "../config.h"

MQTTClient::MQTTClient(const char* broker_uri) {
    _broker_uri = broker_uri;
}

MQTTClient::~MQTTClient() {
    if (_client != nullptr) {
        ESP_ERROR_CHECK(esp_mqtt_client_stop(_client));
        ESP_ERROR_CHECK(esp_mqtt_client_destroy(_client));

        _client = nullptr;
    }
}

void MQTTClient::setData(const char* data) {
    _data = data;
}

void MQTTClient::setTopic(const char* topic) {
    _topic = topic;
}

void MQTTClient::mqtt_event_handler(void* handler, esp_event_base_t base, int32_t event_id, void *event_data) {
    esp_mqtt_event_handle_t event = static_cast<esp_mqtt_event_handle_t>(event_data);
    esp_mqtt_client_handle_t client = event->client;
    int message_id = 0;

    switch (event->event_id) {
        case MQTT_EVENT_CONNECTED:
        ESP_LOGI(TAG, "Connected");
        message_id = esp_mqtt_client_subscribe(client, _topic, QOS);
        ESP_LOGI(TAG, "Subscribed. Message ID = %d", message_id);
        break;

        case MQTT_EVENT_DISCONNECTED:
        ESP_LOGI(TAG, "Disconnected");
        break;

        case MQTT_EVENT_SUBSCRIBED:
        ESP_LOGI(TAG, "Subscribed");
        message_id = esp_mqtt_client_publish(client, _topic, _data, strlen(_data), QOS, RETAIN);
        ESP_LOGI(TAG, "Published. Message ID = %d", message_id);
        break;

        case MQTT_EVENT_UNSUBSCRIBED:
        ESP_LOGI(TAG, "Unsubscribed");
        break;

        case MQTT_EVENT_PUBLISHED:
        ESP_LOGI(TAG, "Published");
        break;

        case MQTT_EVENT_ERROR:
        ESP_LOGI(TAG, "Error. Error type: 0x%x", event->error_handle->error_type); // 0x%x in thêm prefix 0x cho hexa
        break;

        default:
        ESP_LOGI(TAG, "Other event. Message ID = %d", event->msg_id);
        break;
    }
}

void MQTTClient::start() {
    esp_mqtt_client_config_t mqtt_config = {};

    mqtt_config.broker.address.uri = _broker_uri;
    mqtt_config.credentials.username = MQTT_USERNAME;
    mqtt_config.credentials.authentication.password = MQTT_PASSWORD;

    _client = esp_mqtt_client_init(&mqtt_config);

    esp_mqtt_client_register_event(_client, static_cast<esp_mqtt_event_id_t>(ESP_EVENT_ANY_ID), mqtt_event_handler, nullptr);
    esp_mqtt_client_start(_client);
}

bool MQTTClient::publish() {
    if (_client != nullptr) {
        ESP_ERROR_CHECK(esp_mqtt_client_publish(_client, _topic, _data, strlen(_data), QOS, RETAIN));
        return true;
    }
    
    return false;
}