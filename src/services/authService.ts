import { Endpoints } from "@/config/endpoints";
import { httpInstanceNoAuth } from "@/config/request";

const authService = {
  register: async (payload: { username: string; password: string }) => {
    try {
      return await httpInstanceNoAuth.post(Endpoints.AUTH.REGISTER, payload);
    } catch (error: any) {
      return error.response;
    }
  },
  login: async (payload: { username: string; password: string }) => {
    try {
      return await httpInstanceNoAuth.post(Endpoints.AUTH.LOGIN, payload);
    } catch (error: any) {
      return error.response;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login"; // Redirect to login page
  },
};

export default authService;
