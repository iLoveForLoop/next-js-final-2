"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatForm from "./components/ChatForm";
import ChatList from "./components/ChatList";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("user-session-key");
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
    <>
      <h1>Home</h1>
      <h1>Username: {username}</h1>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-4">
        Logout
      </button>
      <ChatForm />
      <ChatList />
    </>
  );
}
