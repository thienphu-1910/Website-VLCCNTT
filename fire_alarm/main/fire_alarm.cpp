#include <iostream>
#include "_init/_init.hpp"
#include "_mqtt/_mqtt.hpp"
#include "_smoke_sensor/_smoke_sensor.hpp"

extern "C" {
    void app_main(void);
}

void app_main(void) {
    // ---------------------------- DEBUG -----------------------------
    // bool init_success = init();

    // if (false == init_success) {
    //     std::cerr << "System initialization failed. Halting execution." << std::endl;
    //     return;
    // }
    // else {
    //     std::cout << "System initialization succeeded. Continuing execution." << std::endl;
    // }

    // std::string brokerURI = "";
    // std::string topic = "";
    // MQTTClient mqtt(brokerURI, topic);
    // bool mqtt_connected = mqtt.connect();
    // if (mqtt_connected == false) {
    //     std::cerr << "Failed to connect to MQTT broker. Halting execution." << std::endl;
    //     return;
    // }

    // adc_channel_t smokeSensorPin = ADC_CHANNEL_6; // GPIO34
    // int smokeThreshold = 50; // 50%
    // SmokeSensor smokeSensor(smokeSensorPin, smokeThreshold);
    // bool smoke_sensor_started = smokeSensor.start();

    // if (smoke_sensor_started == false) {
    //     std::cerr << "Failed to start smoke sensor. Halting execution." << std::endl;
    //     return;
    // }
}

