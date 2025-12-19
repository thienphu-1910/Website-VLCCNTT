#include "esp_log.h"
#include "esp_crt_bundle.h"

#include "include/_mqtt.h"

mqtt_config_t MQTTClient::_config;

MQTTClient::MQTTClient(mqtt_config_t* config) {
    if (config == NULL) {
        ESP_LOGE(TAG, "Failed to initialize: config is NULL.");
        abort();
    }

    _config = *config;

    esp_mqtt_client_config_t mqtt_config = {};

    mqtt_config.broker.address.uri = config->broker_uri;
    mqtt_config.credentials.username = config->username;
    mqtt_config.credentials.authentication.password = config->password;
    mqtt_config.broker.verification.crt_bundle_attach = esp_crt_bundle_attach; 
    // Nếu không có bundle thì có thể tự download Signature (.pem) và update .crt.pem = file .pem vừa download
    // Scalability đối với tự download Signature = 0 nên attach crt bundle.
    // Nôm na là thiết bị sẽ có signature của các Authority -> HiveMQ sẽ có signature của một trong các Authority, nếu trùng signature thì connect, không thì connection refused

    _client = esp_mqtt_client_init(&mqtt_config);

    ESP_ERROR_CHECK(esp_mqtt_client_register_event(_client, static_cast<esp_mqtt_event_id_t>(ESP_EVENT_ANY_ID), mqtt_event_handler, NULL));
    ESP_ERROR_CHECK(esp_mqtt_client_start(_client));
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

const char* MQTTClient::getData() {
    return _config.data;
}

void MQTTClient::mqtt_event_handler(void* handler, esp_event_base_t base, int32_t event_id, void *event_data) {
    esp_mqtt_event_handle_t event = static_cast<esp_mqtt_event_handle_t>(event_data);
    esp_mqtt_client_handle_t client = event->client;
    int message_id = 0;

    switch (event->event_id) {
        case MQTT_EVENT_CONNECTED: {
            ESP_LOGI(TAG, "Connected.");
            int size = sizeof(_config.subscribe_topic) / sizeof(_config.subscribe_topic[0]);
            for (int i = 0; i < size; ++i) {
                message_id = esp_mqtt_client_subscribe(client, _config.subscribe_topic[i], _config.qos);
                ESP_LOGI(TAG, "Subscribed. Message ID = %d.", message_id);
            }
            break;
        }

        case MQTT_EVENT_DISCONNECTED:
            ESP_LOGI(TAG, "Disconnected.");
            break;

        case MQTT_EVENT_SUBSCRIBED: {
            ESP_LOGI(TAG, "Subscribed.");
            break;
        }

        case MQTT_EVENT_UNSUBSCRIBED:
            ESP_LOGI(TAG, "Unsubscribed.");
            break;

        case MQTT_EVENT_PUBLISHED:
            ESP_LOGI(TAG, "Published.");
            break;

        case MQTT_EVENT_ERROR:
            ESP_LOGI(TAG, "Error. Error type: 0x%x.", event->error_handle->error_type); // 0x%x in thêm prefix 0x cho hexa
            break;

        case MQTT_EVENT_DATA: {
            ESP_LOGI(TAG, "Received data");
            const char *topic_light = "fire_alarm/nhom7/light";
            if (event->topic_len == strlen(topic_light) && 
                strncmp(event->topic, topic_light, event->topic_len) == 0) {
                
                if (event->data_len == 2 && strncmp(event->data, "ON", 2) == 0) {
                    light_trigger = 1;
                    ESP_LOGI(TAG, "Light Triggered ON");
                }
            } 
            
            const char *topic_buzzer = "fire_alarm/nhom7/buzzer";
            if (event->topic_len == strlen(topic_buzzer) && 
                    strncmp(event->topic, topic_buzzer, event->topic_len) == 0) {
                
                if (event->data_len == 2 && strncmp(event->data, "ON", 2) == 0) {
                    buzzer_trigger = 1;
                    ESP_LOGI(TAG, "Buzzer Triggered ON");
                }
            }
            
            break;
        }

        case MQTT_EVENT_ANY: 
        case MQTT_EVENT_BEFORE_CONNECT:
        case MQTT_EVENT_DELETED:
            break;

        default:
            ESP_LOGI(TAG, "Other event. Message ID = %d.", event->msg_id);
            break;
    }
}

bool MQTTClient::publish() {
    if (_client != nullptr) {
        int message_id = esp_mqtt_client_publish(_client, _config.topic, _config.data, strlen(_config.data), _config.qos, _config.retain);
        if (message_id == - 1) {
            ESP_LOGE(TAG, "Failed to publish.");
            return false;
        }
    }

    return true;
}

