"use client";
import ChatLayout from "@/components/chat/ChatLayout";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatDetails({ chatId }: { chatId: string }) {
  return <ChatLayout children={<ChatWindow chatId={chatId} />} />;
}
