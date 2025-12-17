#include "_mqtt.h"
#include "esp_log.h"
#include "../config.h"

MQTTClient::MQTTClient(mqtt_config_t* config) {
    if (config == NULL) {
        ESP_LOGE(TAG, "args are invalid");
        abort();
    }

    _config = *config;

    esp_mqtt_client_config_t mqtt_config = {};

    mqtt_config.broker.address.uri = config->broker_uri;
    mqtt_config.credentials.username = config->username;
    mqtt_config.credentials.authentication.password = config->password;

    _client = esp_mqtt_client_init(&mqtt_config);

    esp_mqtt_client_register_event(_client, static_cast<esp_mqtt_event_id_t>(ESP_EVENT_ANY_ID), mqtt_event_handler, nullptr);
    esp_mqtt_client_start(_client);
}

MQTTClient::~MQTTClient() {
    if (_client != nullptr) {
        ESP_ERROR_CHECK(esp_mqtt_client_stop(_client));
        ESP_ERROR_CHECK(esp_mqtt_client_destroy(_client));

        _client = nullptr;
    }
}

void MQTTClient::data(const char* data) {
    _config.data = data;
}

void MQTTClient::mqtt_event_handler(void* handler, esp_event_base_t base, int32_t event_id, void *event_data) {
    esp_mqtt_event_handle_t event = static_cast<esp_mqtt_event_handle_t>(event_data);
    esp_mqtt_client_handle_t client = event->client;
    int message_id = 0;

    switch (event->event_id) {
        case MQTT_EVENT_CONNECTED:
        ESP_LOGI(TAG, "Connected");
        message_id = esp_mqtt_client_subscribe(client, _config.topic, _config.qos);
        ESP_LOGI(TAG, "Subscribed. Message ID = %d", message_id);
        break;

        case MQTT_EVENT_DISCONNECTED:
        ESP_LOGI(TAG, "Disconnected");
        break;

        case MQTT_EVENT_SUBSCRIBED:
        ESP_LOGI(TAG, "Subscribed");
        message_id = esp_mqtt_client_publish(client, _config.topic, _config.data, strlen(_config.data), _config.qos, _config.retain);
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

bool MQTTClient::publish() {
    if (_client != nullptr) {
        ESP_ERROR_CHECK(esp_mqtt_client_publish(_client, _config.topic, _config.data, strlen(_config.data), _config.qos, _config.retain));
        return true;
    }
    
    return false;
}