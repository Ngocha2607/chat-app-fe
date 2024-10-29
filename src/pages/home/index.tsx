"use client";
import React, { useEffect, useState } from "react";
import CreateChatForm from "./CreateChatForm";
import chatService from "@/services/chatService";
import authService from "@/services/authService";

const Homepage = () => {
  const [chats, setChats] = useState([]);

  const fetchListChats = async () => {
    const res = await chatService.getChats();
    if (res?.status === 200) {
      setChats(res.data);
    } else {
      authService.logout();
    }
  };
  useEffect(() => {
    fetchListChats();
  }, []);
  return (
    <div className="grid grid-cols-4">
      <section className="col-span-1">
        <CreateChatForm />
        <div className="max-w-md mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-5">Chats</h2>
          {chats.length > 0 ? (
            <ul>
              {chats.map((chat: any) => (
                <a
                  href={`/chat/${chat._id}`}
                  key={chat._id}
                  className="mb-2 p-2 border rounded"
                >
                  {chat.participants
                    .map((participant: any) => participant)
                    .join(", ")}
                </a>
              ))}
            </ul>
          ) : (
            <p>No chats available.</p>
          )}
        </div>
      </section>
      <section className="col-span-3">
        <div
          className="py-20 relative flex flex-grow flex-col px-12 justify-end"
          style={{ backgroundColor: "#e5ddd5" }}
        >
          <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
            <p className="">
              Do you still have that car from gone in 60 seconds? Can I borrow
              it please.
            </p>
            <p className="text-gray-600 text-xs text-right leading-none">
              8:00 AM
            </p>
          </div>
          <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
            <p>Yeah dude for sure</p>
            <p className="text-gray-600 text-xs text-right leading-none">
              8:45 AM
            </p>
          </div>
          <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
            <p className="">Dude WTF was up with that plane you were on!!!?</p>
            <p className="text-gray-600 text-xs text-right leading-none">
              8:00 AM
            </p>
          </div>
          <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
            <p>LOL I Know right </p>
            <p className="text-gray-600 text-xs text-right leading-none">
              8:45 AM
            </p>
          </div>
          <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
            <p className="">Hey man what should we do this weekend?</p>
            <p className="text-gray-600 text-xs text-right leading-none">
              8:00 AM
            </p>
          </div>
          <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
            <p>Steal the declaration of independence?...</p>
            <p className="text-gray-600 text-xs text-right leading-none">
              8:45 AM
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
