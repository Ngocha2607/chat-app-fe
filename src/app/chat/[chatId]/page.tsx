import ChatDetails from "@/pages/chat/DetailChatPage";
import React from "react";

const ChatDetail = ({ params }: { params: { chatId: string } }) => {
  return (
    <div>
      <ChatDetails chatId={params.chatId} />
    </div>
  );
};

export default ChatDetail;
