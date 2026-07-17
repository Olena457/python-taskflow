"use client";

import { Search, X } from "lucide-react"; 

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
      />

      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full pl-10 pr-10 p-3 border border-border rounded-xl bg-background text-primary focus:ring-2 focus:ring-accent outline-none transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-surface rounded-full transition-colors text-secondary hover:text-primary"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
