"use client";
import useChat, { Member, Message } from "@/hooks/useChat";
import { useEffect, useState } from "react";
import Notification from "./Notification";
import { AuthUser } from "@/models/user";

type Props = {
  chatId: string;
};
export default function ChatWindow({ chatId }: Props) {
  const user: AuthUser = JSON.parse(
    typeof window !== "undefined" ? localStorage.getItem("user") ?? "{}" : "{}"
  );
  const [notification, setNotification] = useState<Message | null>(null);
  const { members, messages, message, setMessage, sendMessage } = useChat(
    chatId,
    setNotification
  );

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    sendMessage(message);
  };

  console.log(chatId);

  return (
    <div className="mx-auto">
      <section className="">
        <div className="h-screen flex flex-col">
          <div className="bg-blue-500 text-white py-2">
            {
              members.find((member: Member) => member._id !== user._id)
                ?.username
            }
          </div>
          <div className="bg-gray-200 flex-1 overflow-y-auto">
            {messages.map((msg: any, index) => {
              return (
                <div key={index} className="px-4 py-2">
                  <div className="text-center">
                    {new Date(msg.timestamp ?? "").toLocaleString()}
                  </div>
                  {msg.sender._id === user._id ? (
                    <div className="flex items-center justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                        {msg.content}
                      </div>
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://picsum.photos/50/50"
                        alt="User Avatar"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center mb-2">
                        <img
                          className="w-8 h-8 rounded-full mr-2"
                          src="https://picsum.photos/50/50"
                          alt="User Avatar"
                        />
                        <div className="font-medium">{msg.sender.username}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                        {msg.content}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <form onSubmit={handleSendMessage}>
            <div className="bg-gray-100 px-4 py-2">
              <div className="flex items-center">
                <input
                  className="w-full border rounded-full py-2 px-4 mr-2"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      {notification && notification.sender._id !== user._id && (
        <Notification message={notification} />
      )}
    </div>
  );
}
