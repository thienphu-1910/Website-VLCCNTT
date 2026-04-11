import { http } from "../libs/http";

const LightEndpoints = {
  root: "/light",
};

export const LightApi = {
  postSignal: async (state) => {
    const stateObj = {
      state: state,
    }
    const respone = await http.post(LightEndpoints.root, stateObj);
    return respone;
  }
}