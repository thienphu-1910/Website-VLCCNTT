import { http } from "../libs/http.js";
import { auth } from "../config/firebase.js";

const SensorLogsEndpoints = {
  common: "/sensorlogs",
};

export const SensorLogsApi = {
  getAll: async () => {
    const respone = await http.get(`${SensorLogsEndpoints.common}`);
    return respone;
  },
  postSensorLogs: async (data) => {
    const userId = auth?.currentUser?.uid;
    if (!userId) return;
    const respone = await http.post(`${SensorLogsEndpoints.common}`, data);
    return respone;
  },
};