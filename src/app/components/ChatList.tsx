"use client";
import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ChatMessage } from "../types/chat";
import { getSessionId } from "@/lib/session";

export default function ChatList() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const sessionId = getSessionId();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as ChatMessage)
      );
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "messages", id));
  };

  const handleEdit = async (id: string) => {
    const newText = prompt("Edit your message:");
    if (newText) {
      await updateDoc(doc(db, "messages", id), { text: newText });
    }
  };

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="border p-2 rounded">
          <p>
            <strong>{msg.username}:</strong> {msg.text}
          </p>
          {msg.sessionId === sessionId && (
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEdit(msg.id)}
                className="text-blue-500"
              >
                Edit
              </button>

              {msg.sessionId == sessionId && (
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
