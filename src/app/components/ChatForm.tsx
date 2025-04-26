"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getSessionId } from "@/lib/session";
// import { useUserStore } from "@/store/userStore";

export default function ChatForm() {
  const [text, setText] = useState("");
  const [username, setUsername] = useState<string>("");

  const handleSend = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "messages"), {
      text,
      username,
      sessionId: getSessionId(),
      createdAt: Timestamp.now(),
    });

    setText("");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername ?? "");
  }, []);

  return (
    <div className="flex mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="border p-2 flex-1"
      />
      <button onClick={handleSend} className="bg-green-500 text-white p-2 ml-2">
        Send
      </button>
    </div>
  );
}
