import { Endpoints } from "@/config/endpoints";
import httpInstance from "@/config/request";

const authService = {
  register: async (payload: { username: string; password: string }) => {
    try {
      return await httpInstance.post(Endpoints.AUTH.REGISTER, payload);
    } catch (error: any) {
      return error.response;
    }
  },
  login: async (payload: { username: string; password: string }) => {
    try {
      return await httpInstance.post(Endpoints.AUTH.LOGIN, payload);
    } catch (error: any) {
      return error.response;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  },
};

export default authService;
