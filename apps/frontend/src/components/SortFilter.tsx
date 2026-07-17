// "use client";

// interface TaskFiltersProps {
//   onFilterChange: (filters: {
//     status: string;
//     sort_priority: string;
//     category: string;
//   }) => void;
// }

// export default function TaskFilters({ onFilterChange }: TaskFiltersProps) {
//   return (
//     <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-4">
//       <select
//         onChange={(e) =>
//           onFilterChange({
//             status: e.target.value,
//             sort_priority: "",
//             category: "",
//           })
//         }
//         className="bg-background border border-border rounded-lg p-2 text-sm text-primary"
//       >
//         <option value="all">All Status</option>
//         <option value="done">Done</option>
//         <option value="undone">Undone</option>
//       </select>

//       <select
//         onChange={(e) =>
//           onFilterChange({
//             status: "",
//             sort_priority: e.target.value,
//             category: "",
//           })
//         }
//         className="bg-background border border-border rounded-lg p-2 text-sm text-primary"
//       >
//         <option value="">Sort by Priority</option>
//         <option value="asc">Low to High</option>
//         <option value="desc">High to Low</option>
//       </select>
//     </div>
//   );
// }
"use client";

interface SortFilterProps {
  status: string;
  sort: string;
  onFilterChange: (filters: { status: string; sort_priority: string }) => void;
}

export default function SortFilter({
  status,
  sort,
  onFilterChange,
}: SortFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <select
        value={status}
        onChange={(e) =>
          onFilterChange({ status: e.target.value, sort_priority: sort })
        }
        className="bg-background border border-border rounded-lg p-2 text-sm text-primary"
      >
        <option value="all">All Status</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
      </select>

      <select
        value={sort}
        onChange={(e) =>
          onFilterChange({ status, sort_priority: e.target.value })
        }
        className="bg-background border border-border rounded-lg p-2 text-sm text-primary"
      >
        <option value="">Sort by Priority</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
}