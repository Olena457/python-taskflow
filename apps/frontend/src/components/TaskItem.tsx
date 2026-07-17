// "use client";

// import { useState } from "react";
// import { Task } from "../types/task";
// import { CheckCircle2, Circle, Trash2, Calendar, Pencil } from "lucide-react";

// interface TaskItemProps {
//   task: Task;
//   onToggle: (id: number) => void;
//   onDelete: (id: number) => void;
//   onEdit: (task: Task) => void;
// }

// export default function TaskItem({
//   task,
//   onToggle,
//   onDelete,
//   onEdit,
// }: TaskItemProps) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div
//       className={`p-4 mb-4 bg-surface rounded-xl shadow-sm border-l-4 transition-all duration-300 hover:shadow-md flex flex-col min-h-[160px] justify-between
//       ${task.done ? "border-green-500 opacity-75" : "border-accent"}
//     `}
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex items-start gap-3 flex-1 min-w-0">
//           <button
//             onClick={() => onToggle(task.id)}
//             className="mt-1 shrink-0 focus:outline-none"
//           >
//             {task.done ? (
//               <CheckCircle2 className="text-green-500 w-6 h-6" />
//             ) : (
//               <Circle className="text-secondary w-6 h-6 hover:text-accent" />
//             )}
//           </button>
//           <span
//             className={`font-bold text-lg ${task.done ? "line-through text-secondary" : "text-primary"}`}
//           >
//             {task.title}
//           </span>
//         </div>

//         {/* buttons */}
//         <div className="flex flex-col  shrink-0">
//           <div className="flex flex-col  gap-3 shrink-0">
//             <button
//               onClick={() => onEdit(task)}
//               className="text-secondary hover:text-accent transition-colors p-1"
//               title="Edit task"
//             >
//               <Pencil size={18} />
//             </button>
//             <button
//               onClick={() => onDelete(task.id)}
//               className="text-red-400 hover:text-red-600 transition-colors p-1"
//               title="Delete task"
//             >
//               <Trash2 size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="ml-9 mt-2">
//         {task.description && (
//           <div>
//             <p
//               className={`text-secondary text-sm transition-all duration-300 ${
//                 isExpanded ? "line-clamp-none" : "line-clamp-1"
//               } max-w-[70%]`}
//             >
//               {task.description}
//             </p>
//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="text-accent text-xs mt-1 font-medium hover:underline focus:outline-none"
//             >
//               {isExpanded ? "Show less" : "Show more"}
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="ml-9 mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-secondary">
//         {task.due_date && (
//           <span className="flex items-center gap-1">
//             <Calendar size={14} />
//             {task.due_date}
//           </span>
//         )}
//         <span className="bg-background border border-border px-2 py-1 rounded-md">
//           Priority: {task.priority}
//         </span>
//         <span className="bg-accent/10 text-accent px-2 py-1 rounded-md">
//           {task.category}
//         </span>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { Task } from "../types/task";
import { CheckCircle2, Circle, Trash2, Calendar, Pencil } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  // onEdit більше не потрібен, бо ми переходимо на іншу сторінку
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`p-4 mb-4 bg-surface rounded-xl shadow-sm border-l-4  border-1 transition-all duration-300 hover:shadow-md flex flex-col min-h-[160px] justify-between
      ${task.done ? "border-green-500 opacity-75" : "border-accent"}
    `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggle(task.id)}
            className="mt-1 shrink-0 focus:outline-none"
          >
            {task.done ? (
              <CheckCircle2 className="text-green-500 w-6 h-6" />
            ) : (
              <Circle className="text-secondary w-6 h-6 hover:text-accent" />
            )}
          </button>
          <span
            className={`font-bold text-lg ${
              task.done ? "line-through text-secondary" : "text-primary"
            }`}
          >
            {task.title}
          </span>
        </div>

        {/* buttons */}
        <div className="flex flex-col shrink-0">
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href={`/tasks/${task.id}`}
              className="text-secondary hover:text-accent transition-colors p-1 flex justify-center"
              title="Edit task"
            >
              <Pencil size={18} />
            </Link>

            <button
              onClick={() => onDelete(task.id)}
              className="text-red-400 hover:text-red-600 transition-colors p-1"
              title="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="ml-9 mt-2">
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
              className="text-accent text-xs mt-1 font-medium hover:underline focus:outline-none"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </div>

      <div className="ml-9 mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-secondary">
        {task.due_date && (
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {task.due_date}
          </span>
        )}
        <span className="bg-background border border-border px-2 py-1 rounded-md">
          Priority: {task.priority}
        </span>
        <span className="bg-accent/10 text-accent px-2 py-1 rounded-md">
          {task.category}
        </span>
      </div>
    </div>
  );
}