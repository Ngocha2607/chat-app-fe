"use client";
import authService from "@/services/authService";
import chatService from "@/services/chatService";
import { useEffect, useState } from "react";

export default function ChatDetails({ chatId }: { chatId: string }) {
  const [chat, setChat] = useState<any>(null);
  const [error, setError] = useState("");
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    const fetchChatDetails = async () => {
      const res = await chatService.getDetailChats(chatId);
      if (res?.status === 200) {
        setChat(res.data);
      } else {
        authService.logout();
      }
    };

    fetchChatDetails();
  }, [chatId]);
  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    const data = await chatService.sendMessage({
      chatId,
      content: messageContent,
    });
    setChat(data);
    setMessageContent("");
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Chat Details</h2>
      {chat ? (
        <div>
          <h3 className="text-xl font-bold mb-3">Participants</h3>
          <ul>
            {chat.participants.map((participant: any) => (
              <li key={participant._id}>{participant.username}</li>
            ))}
          </ul>
          <h3 className="text-xl font-bold mb-3 mt-5">Messages</h3>
          <ul>
            {chat.messages.map((message: any) => (
              <li key={message._id} className="mb-2 p-2 border rounded">
                <strong>{message.sender.username}</strong>: {message.content}{" "}
                <br />
                <span className="text-gray-500 text-sm">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
