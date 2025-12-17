set(srcs)
set(include_dirs "include")

idf_component_register(SRCS "_wifi_sta.cpp" "${srcs}"
                       INCLUDE_DIRS "${include_dirs}"
                       PRIV_REQUIRES esp_wifi esp_netif)