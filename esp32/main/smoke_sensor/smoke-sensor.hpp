#pragma once

const float LOAD_RES = 10.0f;
const float CALIBRATION_FACTOR = 9.83f;

// Constants from MQ-2 datasheet
const float CURVE_A = 36.56;
const float CURVE_B = -3.10;

const int CYCLE = 10;

float R0 = 10.0f; // Calibrated resistance in clean air

class SmokeSensor {
    private:
        int _sensorPin;
        int _smokeLevel;
        std::string _deviceId;
    public:
        SmokeSensor(int sensorPin, std::string deviceId);
        ~SmokeSensor();
        void setSmokeLevel();
        int getSmokeLevel();
        int convertToPPM(int analogValue);
        float calculateResistance(int analogValue);
        float calibrateSensor(float resistance);
};




