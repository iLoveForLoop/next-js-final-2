"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { getSessionId } from "@/lib/session";
import { ChatMessage } from "@/types/chat";

export default function ChatList() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = getSessionId();
    setSessionId(id);

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limitToLast(50)
    );
    const kill = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as ChatMessage)
      );
      setMessages(data);

      setTimeout(() => {
        scrollToBottom();
      }, 100);
    });

    return () => kill();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!sessionId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure do you want to delete this message"))
      await deleteDoc(doc(db, "messages", id));
    return;
  };

  const startEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (id: string) => {
    if (editText.trim()) {
      await updateDoc(doc(db, "messages", id), { text: editText });
      setEditingId(null);
      setEditText("");
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-blue-400/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-lg">No messages yet</p>
          <p className="text-sm">Start the open world conversation!</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-3 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-blue-700/30 flex items-center justify-center">
                <span className="text-blue-200 text-xs">
                  {msg.username?.charAt(0)}
                </span>
              </div>
              <span className="font-medium text-blue-200">{msg.username}</span>
              <span className="text-blue-400/60 text-xs">
                {formatTime(msg.createdAt)}
              </span>
            </div>

            {editingId === msg.id ? (
              <div className="pl-10 mt-1">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-blue-800/50 border border-blue-700/50 rounded p-2 text-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEdit(msg.id);
                    } else if (e.key === "Escape") {
                      cancelEdit();
                    }
                  }}
                  autoFocus
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => saveEdit(msg.id)}
                    className="text-blue-300 hover:text-blue-200 text-xs flex items-center"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-blue-400/70 hover:text-blue-300 text-xs flex items-center"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-blue-100 pl-10">{msg.text}</p>
                {msg.sessionId === sessionId && (
                  <div className="flex space-x-2 mt-2 pl-10">
                    <button
                      onClick={() => startEdit(msg.id, msg.text)}
                      className="text-blue-400 hover:text-blue-300 text-xs flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
