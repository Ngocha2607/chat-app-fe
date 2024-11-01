"use client";
import React, { useEffect, useState } from "react";
import CreateChatForm from "./CreateChatForm";
import chatService from "@/services/chatService";
import authService from "@/services/authService";
import { AuthUser } from "@/models/user";
import { useRouter } from "next/navigation";
import { ChatItem } from "@/models/chat";

const Homepage = () => {
  const user: AuthUser = JSON.parse(
    typeof window !== "undefined" ? localStorage.getItem("user") ?? "{}" : "{}"
  );
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [listUsers, setListUsers] = useState<AuthUser[]>([]);
  const router = useRouter();
  const fetchListChats = async () => {
    const res = await chatService.getChats();
    if (res?.status === 200) {
      const formattedChats = res.data.map((chat: ChatItem) => {
        return {
          ...chat,
          lastMessage:
            chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1]
              : null,
        };
      });
      setChats(formattedChats);
    } else {
      authService.logout();
    }
  };

  const fetchListUsers = async () => {
    const res = await authService.getListUsers();
    if (res?.status === 200) {
      setListUsers(res.data);
    } else {
      authService.logout();
    }
  };
  const handleCreateChat = async (selectedUsers: AuthUser) => {
    const res = await chatService.createChat({
      participants: [user._id, selectedUsers._id],
    });
    if (res) {
      router.push(`/chat/${res.data._id}`);
    }
  };
  useEffect(() => {
    fetchListChats();
    fetchListUsers();
  }, []);

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 px-4 py-8 bg-[#f5f5f5] h-screen overflow-y-auto">
        <div className="mb-10">
          <ul role="list" className="divide-y divide-gray-100">
            {chats.map((item: ChatItem) => {
              const memberChat = item.participants.filter(
                (e) => e._id !== user._id
              );

              return (
                <li key={item._id} className="py-5 border-b">
                  <div className="flex justify-between gap-x-6 ">
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {memberChat.map((u) => u.username).join(", ")}
                        </p>
                        {memberChat.length <= 1 && (
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {memberChat.map((u) => u.username).join(", ")}
                          </p>
                        )}
                        {item.lastMessage && (
                          <div className="flex items-center gap-2">
                            <p className="text-xs leading-5 text-gray-500">
                              {item.lastMessage?.sender.username}:
                            </p>
                            <p className="text-xs leading-5 text-gray-500">
                              {item.lastMessage?.content}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Online
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">You May Know</h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {listUsers
              .filter((u) => u._id !== user._id)
              .map((user: AuthUser) => (
                <li
                  key={user._id}
                  className="flex justify-between gap-x-6 py-5 border-b"
                  onClick={() => handleCreateChat(user)}
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {user.username}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {user.username}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Business Relations
                    </p>
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                      </div>
                      <p className="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
