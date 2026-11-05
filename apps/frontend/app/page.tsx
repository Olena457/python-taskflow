"use client";

import { useState } from "react";
import Link from "next/link";
import TaskHeader from "../src/components/common/TaskHeader";
import PasswordInput from "../src/components/common/PasswordInput";
import ImageGridModal from "../src/components/common/ImageGridModal";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("app_authenticated") === "true";
    }
    return false;
  });

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 text-primary transition-colors duration-300">
      {isAuthenticated && <TaskHeader showBackLink={false} />}

      <ImageGridModal>
        <h1 className="text-3xl min-[475px]:text-4xl font-extrabold tracking-tight mb-3 text-gradient pb-1">
          Welcome to TaskFlow
        </h1>

        <p className="text-sm min-[475px]:text-base text-secondary mb-6">
          The ultimate tool to manage your professional and personal daily tasks
          efficiently.
        </p>

        {!isAuthenticated ? (
          <PasswordInput onSuccess={() => setIsAuthenticated(true)} />
        ) : (
          <Link
            href="/tasks"
            className="btn-gradient font-bold py-2 px-6 rounded-[16px] inline-block text-base shadow-md transition-all duration-300"
          >
            Go to Tasks
          </Link>
        )}
      </ImageGridModal>
    </main>
  );
}
