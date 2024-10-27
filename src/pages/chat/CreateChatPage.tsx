"use client";
import chatService from "@/services/chatService";
import { useState } from "react";

export default function CreateChatPage() {
  const [participants, setParticipants] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const participantIds = participants.split(",").map((id) => id.trim());
      const data = await chatService.createChat({
        participants: participantIds,
      });
      setMessage("Chat created successfully");
    } catch (error: any) {
      setMessage(`Error: ${error?.response.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Create Chat</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Participants</label>
          <input
            type="text"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Comma-separated user IDs"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Chat
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
