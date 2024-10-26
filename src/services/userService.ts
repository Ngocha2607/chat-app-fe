import { Endpoints } from "@/config/endpoints";
import httpInstance from "@/config/request";
import { get } from "http";

const userService = {
  getProfile: async () => {
    try {
      return await httpInstance.get(Endpoints.USER.PROFILE);
    } catch (error: any) {
      return error.response;
    }
  },
};

export default userService;
