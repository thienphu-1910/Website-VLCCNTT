import { http } from "../libs/http.js";
import { auth } from "../config/firebase.js";

const SensorLogsEndpoints = {
  root: "/sensorlogs",
  real_time: "events",
};

export const SensorLogsApi = {
  getAll: async (deviceId) => {
    const respone = await http.get(`${SensorLogsEndpoints.root}/${deviceId}`);
    return respone;
  },
  updateSensorLogs: async (data) => {
    const userId = auth?.currentUser?.uid;
    if (!userId) return;
    const respone = await http.post(`${SensorLogsEndpoints.root}`, data);
    return respone;
  },
};