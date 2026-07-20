
"use client";

import { useState } from "react";
import Link from "next/link";
import { Task } from "../../types/task";
import { Trash2, Calendar, Pencil } from "lucide-react";
import { getStatusConfig } from "../../utils/task-utils";

import TaskReader from "../tasks/TaskReader";
import ConfirmDeleteDialog from "../tasks/ConfirmDeleteDialog";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const config = getStatusConfig(task.status);

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div
        className={`p-4 mb-4 bg-surface rounded-xl shadow-sm border-l-4 border-[0.5px] flex flex-col min-h-[120px] bg-gradient-to-br from-transparent to-transparent to-50% transition-all duration-300 hover:shadow-md ${
          config.borderColor
        } ${config.gradientClass} ${task.status === "done" ? "opacity-75" : ""}`}
      >
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex items-center  gap-2">
            <div
              className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider ${config.color} shrink-0`}
            >
              <config.Icon size={22} />
              <span>{config.text}</span>
            </div>

            <span className="bg-accent/10 text-accent text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold shrink-0">
              {task.category}
            </span>
          </div>

          <div className="flex items-center justify-end h-6">
            {task.description && (
              <div className="mr-1">
                <TaskReader text={task.description} />
              </div>
            )}

            <Link
              href={`/tasks/${task.id}`}
              className="text-secondary hover:text-blue-600 transition-colors p-1"
            >
              <Pencil size={16} />
            </Link>

            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-400 hover:text-red-600 transition-colors p-1 ml-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <h3
          className={`font-bold leading-tight mb-2 cursor-pointer transition-opacity duration-[1500ms] delay-200 ease-out line-clamp-1 max-w-[68%] hover:max-w-full hover:line-clamp-2 opacity-60 hover:opacity-100 ${
            task.status === "done"
              ? "line-through text-secondary"
              : "text-primary"
          }`}
        >
          {task.title}
        </h3>
        <div className="mt-2">
          {task.description && (
            <div>
              <p
                className={`text-secondary text-sm transition-all duration-300 ${
                  isExpanded ? "line-clamp-none" : "line-clamp-1"
                } max-w-[85%]`}
              >
                {task.description}
              </p>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-accent font-bold text-xs mt-2 hover:underline focus:outline-none"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 flex flex-wrap items-center gap-3 text-xs font-bold text-secondary">
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

      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}