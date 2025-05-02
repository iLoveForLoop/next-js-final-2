"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { generateSession } from "@/lib/session";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);

    generateSession(name);

    setTimeout(() => {
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full relative">
        <div className="bg-blue-900/30 backdrop-blur-md border border-blue-700/30 rounded-xl p-8 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-blue-100 mb-2">
            Welcome to Open World
          </h1>
          <p className="text-blue-300 text-center mb-8">
            Enter your identity to continue
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-blue-300 text-sm font-medium mb-2"
              >
                Choose Your Name
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-blue-800/40 border border-blue-700/50 rounded-lg p-4 pl-11 text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Username"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || isLoading}
              className={`w-full py-4 px-4 rounded-lg flex items-center justify-center transition-all duration-300 ${
                !name.trim() || isLoading
                  ? "bg-blue-700/50 text-blue-300/50 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-blue-100"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Joining
                </>
              ) : (
                <>
                  <span className="mr-2">Enter world</span>
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
