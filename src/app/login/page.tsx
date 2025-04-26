"use client";
import React, { useState } from "react";
import { useMyStore } from "../store/useMyStore";
import { useRouter } from "next/navigation";
import { generateSession } from "@/lib/session";

export default function Page() {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    generateSession(name);
    router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Log in</h1>
        <label htmlFor="username">Enter your username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
