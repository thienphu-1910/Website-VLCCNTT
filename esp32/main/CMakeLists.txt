idf_component_register(
    SRCS "fire-alarm.cpp" "_mqtt/_mqtt.cpp" "smoke_sensor/smoke-sensor.cpp"
                    
    INCLUDE_DIRS "." "_mqtt" "smoke_sensor"
)
