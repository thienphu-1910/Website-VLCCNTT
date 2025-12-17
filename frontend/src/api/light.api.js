import { http } from "../libs/http";

const LightEndpoints = {
  common: "/light",
};

export const LightApi = {
  postSignal: async (state) => {
    const stateObj = {
      state: state,
    }
    const respone = await http.post(LightEndpoints.common, stateObj);
    return respone;
  }
}