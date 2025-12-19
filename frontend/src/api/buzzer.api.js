import { http } from "../libs/http";

const BuzzerEndpoint = {
  root: "/buzzer",
};

export const BuzzerApi = {
  postSignal: async (state) => {
    const stateObj = {
      state: state,
    }
    const respone = await http.post(BuzzerEndpoint.root, stateObj);
    return respone;
  }
};