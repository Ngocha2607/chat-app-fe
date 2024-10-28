import { Endpoints } from "@/config/endpoints";
import httpInstance, { httpInstanceNoAuth } from "@/config/request";
import { UserProfile } from "@/models/auth";

const chatService = {
  createChat: async (payload: { participants: string[] }) => {
    try {
      return await httpInstance.post(Endpoints.CHAT.CREATE_CHAT, payload);
    } catch (error: any) {
      return error.response;
    }
  },
};

export default chatService;
