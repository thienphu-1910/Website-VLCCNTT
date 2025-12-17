import { http } from "../libs/http.js";
import { auth } from "../config/firebase.js";

const HistoryEndpoints = {
  common: "/histories",
};

export const HistoryApi = {
  getAll: async () => {
    const respone = await http.get(`${HistoryEndpoints.common}`);
    return respone;
  },
  postHistory: async (data) => {
    const userId = auth?.currentUser?.uid;
    if (!userId) return;
    const respone = await http.post(`${HistoryEndpoints.common}`, data);
    return respone;
  },
};