"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  DefaultEventsMap,
  EventNames,
  EventParams,
  EventsMap,
  Emitter,
} from "@socket.io/component-emitter";

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    newSocket.emit("joinChat", chatId);

    newSocket.on("receiveMessage", (data) => {
      setMessages(data.messages);
      if(onNew)
    });

    // return () => newSocket.disconnect();
  }, [chatId]);

  const sendMessage = (userId: string, content: string) => {
    socket?.emit("sendMessage", {
      chatId,
      userId,
      content,
    });
    setMessage("");
  };
  return {
    messages,
    message,
    setMessage,
    sendMessage,
  };
};
export default useChat;
