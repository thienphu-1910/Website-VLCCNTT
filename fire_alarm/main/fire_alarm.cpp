#include <iostream>
#include "_init/_init.hpp"

extern "C" {
    void app_main(void);
}

void app_main(void) {
    bool init_success = init();

    if (false == init_success) {
        std::cerr << "System initialization failed. Halting execution." << std::endl;
        return;
    }
    else {
        std::cout << "System initialization succeeded. Continuing execution." << std::endl;
        return;
    }
}

