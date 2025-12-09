idf_component_register(SRCS "fire_alarm.cpp" "_init/_init.cpp"  "_mqtt/_mqtt.cpp"
                       PRIV_REQUIRES spi_flash nvs_flash esp_netif esp_event mqtt
                       INCLUDE_DIRS "" "_init" "_mqtt")
