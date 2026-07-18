
"use client";

import { Toaster } from "react-hot-toast";
import TaskForm from "../../src/components/tasks/TaskForm";
import { TaskList } from "../../src/components/tasks/TaskList"; // Оновлений компонент списку
import TaskHeader from "../../src/components/common/TaskHeader";
import SearchInput from "../../src/components/ui/SearchInput";
import SortFilter from "../../src/components/ui/SortFilter";
import { useTasks } from "../../src/hooks/useTasks"; // Імпорт нового хука

export default function TasksPage() {
  const { tasks, loading, error, filters, setFilters, addTask, removeTask } =
    useTasks();

  return (
    <main className="min-h-screen bg-background text-primary transition-colors duration-300 flex flex-col">
      <Toaster position="bottom-right" />

      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-border">
          <div className="max-w-8xl mx-auto">
            <TaskHeader showBackLink={true} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 flex-1 overflow-hidden">
          {/* Task Form */}
          <div className="space-y-6">
            <TaskForm onSubmit={addTask} />
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

            {/* Використовуємо чистий компонент списку */}
            <div className="flex-1 overflow-y-auto pr-2">
              <TaskList
                tasks={tasks}
                loading={loading}
                error={error}
                onDelete={removeTask}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}