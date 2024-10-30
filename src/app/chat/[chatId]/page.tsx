import ChatDetails from "@/pages/chat/DetailChatPage";
import React from "react";

const ChatDetail = ({ params }: { params: { chatId: string } }) => {
  const userId = "671c62a987e63b4d1f8b900b";
  return (
    <div>
      <ChatDetails chatId={params.chatId} userId={userId} />
    </div>
  );
};

export default ChatDetail;
