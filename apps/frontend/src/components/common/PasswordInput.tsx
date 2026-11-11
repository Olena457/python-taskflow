"use client";

import { useState } from "react";

interface PasswordInputProps {
  onSuccess: () => void;
}

export default function PasswordInput({ onSuccess }: PasswordInputProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.trim() === "") {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/tasks`, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
      });

      if (res.ok) {
        sessionStorage.setItem("app_password", password);
        sessionStorage.setItem("app_authenticated", "true");
        onSuccess();
      } else {
        setError(true);
        sessionStorage.removeItem("app_password");
        sessionStorage.removeItem("app_authenticated");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-4"
    >
      <input
        type="text"
        name="username"
        autoComplete="username"
        defaultValue="admin"
        style={{ display: "none" }}
      />
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter admin password..."
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 pr-12 rounded-[14px] border border-secondary/30 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-yellow-400 shadow-sm transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          Invalid password. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-gradient font-bold py-2.5 px-6 rounded-[16px] text-base shadow-md transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Verifying..." : "Unlock TaskFlow"}
      </button>
    </form>
  );
}
