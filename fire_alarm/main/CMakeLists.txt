idf_component_register(SRCS "fire_alarm.cpp" "_mqtt/_mqtt.cpp" "_smoke_sensor/_smoke_sensor.cpp" "_buzzer/_buzzer.cpp" "_led/_led.cpp" "_flame_sensor/_flame_sensor.cpp"
                       PRIV_REQUIRES spi_flash nvs_flash esp_netif esp_event mqtt freertos esp_driver_gpio esp_adc
                       INCLUDE_DIRS "" "_mqtt" "_smoke_sensor" "_buzzer" "_led" "_flame_sensor")
