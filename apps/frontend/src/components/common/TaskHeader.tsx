
"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface TaskHeaderProps {
  showBackLink?: boolean;
  actions?: React.ReactNode;
}

export default function TaskHeader({
  showBackLink = true,
  actions,
}: TaskHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-red-100 p-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">
          TaskFlow
        </h1>
        <p className="text-sm text-secondary mt-1">
          Manage your professional daily tasks efficiently.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {showBackLink && (
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium bg-surface border border-border rounded-lg hover:bg-secondary/10 transition-colors"
          >
            Home
          </Link>
        )}

        <Link
          href="/tasks"
          className="px-4 py-2 text-sm font-medium bg-surface border border-border rounded-lg hover:bg-secondary/10 transition-colors"
        >
          Tasks
        </Link>

        <Link
          href="/board"
          className="px-4 py-2 text-sm font-medium bg-surface border border-border rounded-lg hover:bg-secondary/10 transition-colors"
        >
          Board
        </Link>

        {actions}
        <ThemeToggle />
      </div>
    </header>
  );
}