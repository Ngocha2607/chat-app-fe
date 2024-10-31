"use client";

import { AuthUser } from "@/models/user";
import chatService from "@/services/chatService";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define types for our messages and chat data
interface Message {
  userId: string;
  content: string;
  timestamp?: Date;
}

interface ChatMessage {
  chatId: string;
  userId: string;
  content: string;
}

const useChat = (chatId: string) => {
  const user: AuthUser = JSON.parse(localStorage.getItem("user")!);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const fetchMessages = async () => {
    const response = await chatService.getDetailChats(chatId);
    if (response?.status === 200) {
      setMessages(response.data.messages);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    // Create socket connection
    const newSocket: Socket = io(process.env.NEXT_PUBLIC_API_URL);
    setSocket(newSocket);

    // Join the chat room
    newSocket.emit("joinChat", chatId);

    // Listen for incoming messages
    newSocket.on("receiveMessage", (data: { messages: Message[] }) => {
      console.log(data);

      setMessages(data.messages);
    });

    // Cleanup function
    return () => {
      newSocket.close();
    };
  }, [chatId]);

  const sendMessage = (content: string): void => {
    if (socket) {
      const messageData: ChatMessage = {
        chatId,
        userId: user._id,
        content,
      };
      socket.emit("sendMessage", messageData);
      setMessage("");
    }
  };

  return {
    messages,
    message,
    setMessage,
    sendMessage,
  };
};

export default useChat;
