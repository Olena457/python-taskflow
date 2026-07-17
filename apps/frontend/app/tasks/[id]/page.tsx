
"use client";

import { useEffect, useState, useRef, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Task, TaskCreateInput } from "../../../src/types/task";
import { getTaskById, updateTask } from "../../../src/api";
import TaskForm from "../../../src/components/TaskForm";
import { Spinner } from "../../../src/components/Spinner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function EditTaskContent({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (error) {
        console.error("Fetch task error:", error);
        toast.error("Could not load task data");
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [id]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleUpdate = async (updatedData: TaskCreateInput) => {
    try {
      await updateTask(Number(id), updatedData);
      toast.success("Task updated!");
      timerRef.current = setTimeout(() => router.push("/tasks"), 1000);
    } catch (error) {
      console.error("Update task error:", error);
      toast.error("Failed to update task");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner variant="ring" size={40} className="text-accent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 text-primary">
      <Toaster position="bottom-right" />
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/tasks"
            className="text-accent hover:underline flex items-center gap-1 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Tasks
          </Link>
          <h1 className="text-2xl font-bold mt-4">Edit Task</h1>
        </div>
        {task ? (
          <TaskForm
            initialData={task}
            onSubmit={handleUpdate}
            onCancel={() => router.push("/tasks")}
          />
        ) : (
          <p className="text-red-500">Task not found.</p>
        )}
      </div>
    </main>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Spinner variant="ring" size={40} />
        </div>
      }
    >
      <EditTaskContent params={params} />
    </Suspense>
  );
}