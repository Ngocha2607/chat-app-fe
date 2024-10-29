import { Endpoints } from "@/config/endpoints";
import httpInstance, { httpInstanceNoAuth } from "@/config/request";
import { UserProfile } from "@/models/auth";
import { get } from "http";

const chatService = {
  createChat: async (payload: { participants: string[] }) => {
    try {
      return await httpInstance.post(Endpoints.CHAT.CREATE_CHAT, payload);
    } catch (error: any) {
      return error.response;
    }
  },
  getChats: async () => {
    try {
      return await httpInstance.get(Endpoints.CHAT.LIST_CHATS);
    } catch (error: any) {
      return error.response;
    }
  },
  getDetailChats: async (chatId: string) => {
    try {
      return await httpInstance.get(Endpoints.CHAT.DETAIL_CHAT + `/${chatId}`);
    } catch (error: any) {
      return error.response;
    }
  },
  sendMessage: async (payload: { chatId: string; content: string }) => {
    try {
      return await httpInstance.post(
        `${Endpoints.CHAT.DETAIL_CHAT}/${payload.chatId}/${Endpoints.CHAT.MESSAGE.SEND}`,
        payload
      );
    } catch (error: any) {
      return error.response;
    }
  },
};

export default chatService;
