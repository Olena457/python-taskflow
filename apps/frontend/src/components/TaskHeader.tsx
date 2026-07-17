
"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { ArrowLeft } from "lucide-react";

interface TaskHeaderProps {
  showBackLink?: boolean;
  actions?: React.ReactNode;
}

export default function TaskHeader({
  showBackLink = true,
  actions,
}: TaskHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-red-100">
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-surface border border-border rounded-lg hover:bg-secondary/10 transition-colors"
          >
            <ArrowLeft size={16} />
            Home
          </Link>
        )}
        {actions}
        <ThemeToggle />
      </div>
    </header>
  );
}