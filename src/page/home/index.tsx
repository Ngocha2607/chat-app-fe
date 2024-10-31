"use client";
import React, { useEffect, useState } from "react";
import CreateChatForm from "./CreateChatForm";
import chatService from "@/services/chatService";
import authService from "@/services/authService";
import { AuthUser } from "@/models/user";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const user: AuthUser = JSON.parse(
    typeof window !== "undefined" ? localStorage.getItem("user") ?? "{}" : "{}"
  );
  const [chats, setChats] = useState([]);
  const [listUsers, setListUsers] = useState<AuthUser[]>([]);
  const router = useRouter();
  const fetchListChats = async () => {
    const res = await chatService.getChats();
    if (res?.status === 200) {
      setChats(res.data);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ul role="list" className="divide-y divide-gray-100">
        {listUsers.map((user, index) => (
          <li
            key={index}
            className="flex justify-between gap-x-6 py-5 cursor-pointer"
            onClick={() => handleCreateChat(user)}
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                Co-Founder / CEO
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
