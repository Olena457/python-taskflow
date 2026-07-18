
"use client";

import { useState } from "react";
import Link from "next/link";
import { Task } from "../../types/task";
import { Trash2, Calendar, Pencil } from "lucide-react";
import { getStatusConfig } from "../../utils/task-utils";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = getStatusConfig(task.status);

  return (
    <div
      className={`p-4 mb-4 bg-surface rounded-xl shadow-sm border-l-4 border-[0.5px] transition-all duration-300 hover:shadow-md flex flex-col min-h-[120px] ${
        config.borderColor
      } ${task.status === "done" ? "opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className={`flex items-center gap-1.5 font-bold text-[11px] tracking-wider uppercase ${config.color}`}
          >
            <config.Icon size={16} />
            <span>{config.text}</span>
          </div>

          <span className="bg-accent/10 text-accent text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold">
            {task.category}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Link
            href={`/tasks/${task.id}`}
            className="text-secondary hover:text-blue-600 transition-colors p-1"
            title="Edit task"
          >
            <Pencil size={16} />
          </Link>

          <button
            onClick={() => onDelete(task.id)}
            className="text-red-400 hover:text-red-600 transition-colors p-1"
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3
        className={`font-bold text-lg leading-tight mb-2 ${
          task.status === "done"
            ? "line-through text-secondary"
            : "text-primary"
        }`}
      >
        {task.title}
      </h3>

      <div className="mt-3">
        {task.description && (
          <div>
            <p
              className={`text-secondary text-sm transition-all duration-300 ${
                isExpanded ? "line-clamp-none" : "line-clamp-1"
              } max-w-[70%]`}
            >
              {task.description}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-accent font-bold text-xs mt-1 hover:underline focus:outline-none"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-auto pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-secondary">
        <span className="bg-background border border-border px-2 py-1 rounded-sm">
          Priority: {task.priority}
        </span>

        {task.due_date && (
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {task.due_date}
          </span>
        )}
      </div>
    </div>
  );
}