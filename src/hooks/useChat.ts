"use client";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    const newSocket: Socket = io("http://localhost:3000");
    setSocket(newSocket);

    // Join the chat room
    newSocket.emit("joinChat", chatId);

    // Listen for incoming messages
    newSocket.on("receiveMessage", (data: { messages: Message[] }) => {
      setMessages(data.messages);
    });

    // Cleanup function
    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

  const sendMessage = (userId: string, content: string): void => {
    if (socket) {
      const messageData: ChatMessage = {
        chatId,
        userId,
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
