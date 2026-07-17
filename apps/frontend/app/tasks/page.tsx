
"use client";

import { useEffect, useState } from "react";
import { Task, TaskCreateInput } from "../../src/types/task";
import { fetchTasks, createTask, toggleTask, deleteTask } from "../../src/api";
import TaskForm from "../../src/components/TaskForm";
import TaskItem from "../../src/components/TaskItem";
import { Spinner } from "../../src/components/Spinner";
import TaskHeader from "../../src/components/TaskHeader";
import SearchInput from "../../src/components/SearchInput"; 
import SortFilter from "../../src/components/SortFilter"; 
import toast, { Toaster } from "react-hot-toast";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Record<string, string>>({
    search: "",
    status: "all",
    sort_priority: "",
  });

  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      try {
        const query = new URLSearchParams(filters).toString();
        const data = await fetchTasks(query);
        setTasks(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not connect to the backend server.");
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, [filters]);

  const handleAddTask = async (taskInput: TaskCreateInput) => {
    try {
      const newTask = await createTask(taskInput);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task added successfully!");
    } catch  {
      toast.error("Failed to create task");
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      const updatedTask = await toggleTask(id);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch  {
      toast.error("Failed to update task status");
    }
  };

  const handleByTaskDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

    return (
      <main className="min-h-screen bg-background text-primary transition-colors duration-300 flex flex-col">
        <Toaster position="bottom-right" />

        <div className="max-w-6xl mx-auto h-screen flex flex-col">
          <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="max-w-6xl mx-auto p-4 md:px-8">
              <TaskHeader showBackLink={true} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 flex-1 overflow-hidden">
            {/* Task Form */}
            <div className="space-y-6">
              <TaskForm onSubmit={handleAddTask} />
            </div>

            <div className="flex flex-col h-full overflow-hidden space-y-4">
              <div className="space-y-4 flex-shrink-0">
                <SearchInput
                  value={filters.search}
                  onChange={(val) =>
                    setFilters((prev) => ({ ...prev, search: val }))
                  }
                />
                <SortFilter
                  status={filters.status}
                  sort={filters.sort_priority}
                  onFilterChange={(newFilters) =>
                    setFilters((prev) => ({ ...prev, ...newFilters }))
                  }
                />
              </div>

              <div className="flex-1 overflow-y-auto pr-2">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Spinner variant="ring" size={40} />
                  </div>
                ) : error ? (
                  <p className="text-center text-red-500 py-4">{error}</p>
                ) : tasks.length === 0 ? (
                  <p className="text-center text-secondary py-8 border border-dashed rounded-lg">
                    No tasks found.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleByTaskDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}