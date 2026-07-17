// "use client";

// import { useState } from "react";
// import { TaskCreateInput } from "../types/task";
// import {
//   Plus,
//   Type,
//   AlignLeft,
//   Calendar as CalendarIcon,
//   ArrowUpNarrowWide,
//   Tags,
// } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// interface TaskFormProps {
//   onAdd: (task: TaskCreateInput) => void;
// }

// export default function TaskForm({ onAdd }: TaskFormProps) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState(1);
//   const [category, setCategory] = useState("");
//   const [dueDate, setDueDate] = useState<Date | null>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Додаткова перевірка на боці клієнта, щоб пріоритет не був менше 1
//     if (!title.trim() || !category || priority < 1) return;

//     const formattedDate = dueDate
//       ? dueDate.toISOString().split("T")[0]
//       : undefined;

//     onAdd({
//       title,
//       description: description || undefined,
//       priority,
//       category,
//       due_date: formattedDate,
//     });

//     setTitle("");
//     setDescription("");
//     setPriority(1);
//     setCategory("");
//     setDueDate(null);
//   };

//   const inputClass =
//     "w-full px-3 py-2 bg-background border border-border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-colors";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-surface p-6 rounded-lg shadow-sm border border-border mb-8"
//     >
//       <div className="grid grid-cols-1 gap-4">
//         {/* Title */}
//         <div>
//           <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
//             <Type size={16} />
//             Task Title *
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className={inputClass}
//             placeholder="What needs to be done?"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
//             <AlignLeft size={16} />
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={`${inputClass} min-h-[100px]`}
//             placeholder="Add detailed notes here..."
//           />
//         </div>

//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
//               <CalendarIcon size={16} />
//               Due Date
//             </label>
//             <DatePicker
//               selected={dueDate}
//               onChange={(date: Date | null) => setDueDate(date)}
//               minDate={new Date()}
//               className={inputClass}
//               placeholderText="Select date..."
//               dateFormat="yyyy-MM-dd"
//               wrapperClassName="w-full"
//             />
//           </div>
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
//               <ArrowUpNarrowWide size={16} />
//               Priority
//             </label>
//             <input
//               type="number"
//               min="1"
//               max="10"
//               value={priority}
//               onChange={(e) => setPriority(Number(e.target.value))}
//               className={inputClass}
//             />
//           </div>
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
//               <Tags size={16} />
//               Category *
//             </label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//               // h-[42px] фіксує висоту, pr-8 дає місце для стрілочки
//               className={`${inputClass} pr-8 h-[42px]`}
//             >
//               <option value="" disabled>
//                 Select...
//               </option>
//               <option value="Work">Work</option>
//               <option value="Personal">Personal</option>
//               <option value="Health">Health</option>
//               <option value="Home">Home</option>
//             </select>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="mt-2 w-full bg-accent text-black font-bold py-2 px-4 rounded-md hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
//         >
//           <Plus size={18} />
//           Add Task
//         </button>
//       </div>
//     </form>
//   );
// }
"use client";

import { useState, FormEvent } from "react";
import { Task, TaskCreateInput } from "../types/task";
import {
  Plus,
  Save,
  X,
  Type,
  AlignLeft,
  Calendar as CalendarIcon,
  ArrowUpNarrowWide,
  Tags,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TaskFormProps {
  onSubmit: (task: TaskCreateInput) => void;
  initialData?: Task;
  onCancel?: () => void;
}

export default function TaskForm({
  onSubmit,
  initialData,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [priority, setPriority] = useState(initialData?.priority || 1);
  const [category, setCategory] = useState(initialData?.category || "");
  const [dueDate, setDueDate] = useState<Date | null>(
    initialData?.due_date ? new Date(initialData.due_date) : null,
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !category || priority < 1) return;

    const formattedDate = dueDate
      ? dueDate.toISOString().split("T")[0]
      : undefined;

    onSubmit({
      title,
      description: description || undefined,
      priority,
      category,
      due_date: formattedDate,
    });

    if (!initialData) {
      setTitle("");
      setDescription("");
      setPriority(1);
      setCategory("");
      setDueDate(null);
    }
  };

  const inputClass =
    "w-full px-3 py-2 bg-background border border-border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-colors";

  // Якщо initialData існує, ми прибираємо зайві рамки і відступи, щоб форма гарно виглядала всередині TaskItem
  const formWrapperClass = initialData
    ? "w-full animate__animated animate__fadeIn"
    : "bg-surface p-6 rounded-lg shadow-sm border border-border mb-8 w-full";

  return (
    <form onSubmit={handleSubmit} className={formWrapperClass}>
      <div className="grid grid-cols-1 gap-4">
        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
            <Type size={16} />
            Task Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
            placeholder="What needs to be done?"
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
            <AlignLeft size={16} />
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} min-h-[100px]`}
            placeholder="Add detailed notes here..."
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
              <CalendarIcon size={16} />
              Due Date
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date: Date | null) => setDueDate(date)}
              minDate={new Date()}
              className={inputClass}
              placeholderText="Select date..."
              dateFormat="yyyy-MM-dd"
              wrapperClassName="w-full"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
              <ArrowUpNarrowWide size={16} />
              Priority
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
              <Tags size={16} />
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={`${inputClass} pr-8 h-[42px]`}
            >
              <option value="" disabled>
                Select...
              </option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Home">Home</option>
            </select>
          </div>
        </div>

        {/* buttons*/}
        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-accent text-gray font-bold py-2 px-4 rounded-md hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
          >
            {initialData ? (
              <>
                <Save size={18} /> Save Changes
              </>
            ) : (
              <>
                <Plus size={18} /> Add Task
              </>
            )}
          </button>

          {initialData && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-background border border-border text-secondary font-bold py-2 px-4 rounded-md hover:text-red-500 transition-colors flex items-center justify-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}