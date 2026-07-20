

"use client";

import Link from "next/link";
import TaskHeader from "../src/components/common/TaskHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8 text-primary transition-colors duration-300">
      <TaskHeader showBackLink={false} />

      <div className="flex flex-col items-center justify-center mt-20 text-center max-w-xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-gradient pb-2">
          Welcome to TaskFlow
        </h1>

        <p className="text-lg text-secondary mb-8">
          The ultimate tool to manage your professional and personal daily tasks
          efficiently.
        </p>

        <Link
          href="/tasks"
          className="btn-gradient font-bold py-3 px-8 rounded-[16px] inline-block text-lg shadow-md transition-all duration-300"
        >
          Go to My Tasks
        </Link>
      </div>
    </main>
  );
}