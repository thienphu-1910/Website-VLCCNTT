#include <iostream>
#include "_init/_init.hpp"
#include "_mqtt/_mqtt.hpp"
#include "_smoke_sensor/_smoke_sensor.hpp"
#include "../config.hpp"
#include <stdlib.h>

extern "C" {
    void app_main(void);
}

void app_main(void) {
    // Initialize system 
    bool init_success = init();

    if (false == init_success) {
        std::cerr << "System initialization failed. Halting execution." << std::endl;
        return;
    }
    else {
        std::cout << "System initialization succeeded. Continuing execution." << std::endl;
    }

    // TODO: Connect to WiFi 

    // Declare and start MQTT client
    std::string broker_uri = MQTT_BROKER_URI;
    std::string topic = MQTT_TOPIC;
    MQTTClient mqtt(broker_uri, topic);
    bool mqtt_connected = mqtt.connect();
    if (mqtt_connected == false) {
        std::cerr << "Failed to connect to MQTT broker. Halting execution." << std::endl;
        return;
    }

    // Declare and start a smoke sensor
    adc_channel_t smoke_sensor_pin = SMOKE_SENSOR_PIN; // GPIO34
    int smoke_threshold = SMOKE_THRESHOLD; // 50%
    SmokeSensor smokeSensor(smoke_sensor_pin, smoke_threshold);
    bool smoke_sensor_started = smokeSensor.start();

    if (smoke_sensor_started == false) {
        std::cerr << "Failed to start smoke sensor. Halting execution." << std::endl;
        return;
    }

    // Declare and start flame sensor

    // Declare and start temperature sensor

    while (true) {
        smokeSensor.readSmokeLevel();
        // flameSensor.readFlameLevel();
        // temperatureSensor.readTemperature();

        // constructs json message
        std::string message = "{";
        std::string device_id_msg = "\"device_id\": \"device_0001\", ";
        std::string smoke_level_msg = "\"co_percent\": " + std::to_string(smokeSensor.getSmokeLevel());
        

        message += device_id_msg + smoke_level_msg;
        message += "}";

        mqtt.publish(message, QOS, RETAIN);
        vTaskDelay(5000 / portTICK_PERIOD_MS); // Delay for 5 seconds

        // MQTT cần subscribe để nhận tín hiệu nút bấm từ server + thay đổi về tiếng cho buzzer
    }
}

