"use client";
import ChatWindow from "@/components/chat/ChatWindow";
import useChat from "@/hooks/useChat";
import authService from "@/services/authService";
import chatService from "@/services/chatService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatDetails({ chatId }: { chatId: string }) {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Chat Details</h2>
      <ChatWindow chatId={chatId} />
    </div>
  );
}
