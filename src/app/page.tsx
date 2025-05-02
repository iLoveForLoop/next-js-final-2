"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatForm from "./components/ChatForm";
import ChatList from "./components/ChatList";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("user-session-id");
    localStorage.removeItem("username");
    router.push("/login");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    if (!storedUsername) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-900 to-black text-blue-50">
      <header className="bg-blue-900/80 backdrop-blur-md border-b border-blue-500/30 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-6"
            >
              <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-blue-100">Open World</h1>
        </div>
        <div className="flex items-center space-x-4">
          {username && (
            <span className="text-blue-200 text-sm bg-blue-800/50 py-1 px-3 rounded-full border border-blue-700/50">
              {username}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-blue-800 hover:bg-blue-700 text-blue-200 text-sm py-1 px-3 rounded-md border border-blue-600/50 transition-colors duration-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatList />
        <ChatForm />
      </div>
    </div>
  );
}
