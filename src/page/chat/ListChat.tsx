"use client";
import { useEffect, useState } from "react";
import chatService from "@/services/chatService";
import { ChatItem } from "@/models/chat";
import { useRouter } from "next/navigation";

export default function ListChat() {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      const res = await chatService.getChats();
      if (res?.status === 200) {
        setChats(res.data);
      } else {
        setChats([]);
      }
    };

    fetchChats();
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.participants.some((participant) =>
      participant.username.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Chats</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-5"
        placeholder="Search chats..."
      />
      {filteredChats.length > 0 ? (
        <ul>
          {filteredChats.map((chat) => (
            <li
              key={chat._id}
              className="mb-2 p-2 border rounded cursor-pointer"
              onClick={() => handleChatClick(chat._id)}
            >
              {chat.participants
                .map((participant) => participant.username)
                .join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats available.</p>
      )}
    </div>
  );
}
