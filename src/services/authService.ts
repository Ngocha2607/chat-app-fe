import { Endpoints } from "@/config/endpoints";
import httpInstance, { httpInstanceNoAuth } from "@/config/request";
import { UserProfile } from "@/models/auth";

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
  getUserProfile: async () => {
    try {
      return await httpInstance.get(Endpoints.AUTH.PROFILE);
    } catch (error: any) {
      return error.response;
    }
  },
  update: async (payload: UserProfile) => {
    try {
      return await httpInstance.put(Endpoints.AUTH.UPDATE, payload);
    } catch (error: any) {
      return error.response;
    }
  },
};

export default authService;
