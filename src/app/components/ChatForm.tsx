"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getSessionId } from "@/lib/session";

export default function ChatForm() {
  const [text, setText] = useState("");
  const [username, setUsername] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;

    setIsSending(true);

    try {
      await addDoc(collection(db, "messages"), {
        text,
        username,
        sessionId: getSessionId(),
        createdAt: Timestamp.now(),
      });

      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername ?? "");
  }, []);

  return (
    <div className="bg-blue-900/80 backdrop-blur-md border-t border-blue-700/30 p-4">
      <div className="flex bg-blue-800/50 rounded-lg border border-blue-600/30 overflow-hidden">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your wholesome message..."
          className="bg-transparent p-3 flex-1 text-blue-100 placeholder-blue-400/70 focus:outline-none"
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          disabled={isSending || !text.trim()}
          className={`px-4 transition-colors duration-200 flex items-center ${
            isSending || !text.trim()
              ? "bg-blue-700/50 text-blue-300/50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-blue-100"
          }`}
        >
          {isSending ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
