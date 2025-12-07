idf_component_register(SRCS "fire_alarm.cpp" "_init/_init.cpp" 
                       PRIV_REQUIRES spi_flash nvs_flash esp_netif esp_event
                       INCLUDE_DIRS "" "_init")
