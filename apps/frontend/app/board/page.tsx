
"use client";

import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TaskHeader from "../../src/components/common/TaskHeader";
import BoardColumn from "../../src/components/tasks/BoardColumn";
import { Task } from "../../src/types/task";
import { fetchTasks, updateTask, deleteTask } from "../../src/api";
import toast from "react-hot-toast";
import { Spinner } from "../../src/components/ui/Spinner";

export default function BoardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const taskId = Number(draggableId);
    const newStatus = destination.droppableId;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );

    try {
      await updateTask(taskId, { status: newStatus });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
      fetchTasks().then(setTasks);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <main className="h-screen bg-background text-primary flex flex-col overflow-hidden">
      <div className="shrink-0 z-50 bg-background/95 border-b border-border/50">
        <TaskHeader showBackLink={true} />
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar p-4 md:p-8">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-2 pb-12">
            <BoardColumn
              id="todo"
              title="To Do"
              tasks={tasks.filter((t) => t.status === "todo")}
              onDelete={handleDelete}
            />
            <BoardColumn
              id="in_progress"
              title="In Progress"
              tasks={tasks.filter((t) => t.status === "in_progress")}
              onDelete={handleDelete}
            />
            <BoardColumn
              id="done"
              title="Done"
              tasks={tasks.filter((t) => t.status === "done")}
              onDelete={handleDelete}
            />
            <BoardColumn
              id="undone"
              title="Undone"
              tasks={tasks.filter((t) => t.status === "undone")}
              onDelete={handleDelete}
            />
          </div>
        </DragDropContext>
      </div>
    </main>
  );
}