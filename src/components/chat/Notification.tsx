import { Message } from "@/hooks/useChat";
import React from "react";

type Props = {
  message: Message | null;
};
const Notification = ({ message }: Props) => {
  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 p-4 bg-blue-500 text-white rounded shadow-lg">
      <strong>{message?.userId}</strong>: {message?.content}
    </div>
  );
};

export default Notification;
