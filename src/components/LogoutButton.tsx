import authService from "@/services/authService";
import React from "react";
export default function LogoutButton() {
  return (
    <button
      onClick={authService.logout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
