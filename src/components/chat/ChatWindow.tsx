"use client";
import useChat, { Message } from "@/hooks/useChat";
import { useEffect, useState } from "react";
import Notification from "./Notification";

type Props = {
  chatId: string;
};
export default function ChatWindow({ chatId }: Props) {
  const [notification, setNotification] = useState<Message | null>(null);
  const { messages, message, setMessage, sendMessage } = useChat(
    chatId,
    setNotification
  );

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Chat</h2>
      <div>
        <ul className="mb-5">
          {messages.map((msg: any, index) => (
            <li key={index} className="mb-2 p-2 border rounded">
              <strong>{msg.sender.username}</strong>: {msg.content} <br />
              <span className="text-gray-500 text-sm">
                {new Date(msg.timestamp ?? "").toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </form>
      </div>
      <Notification message={notification} />
    </div>
  );
}
