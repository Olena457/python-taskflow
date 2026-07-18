import { CircleAlert, Clock, CheckCircle2, XCircle } from "lucide-react";

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "todo":
      return {
        color: "text-red-500",
        borderColor: "border-red-500",
        text: "TO DO",
        Icon: CircleAlert,
      };
    case "in_progress":
      return {
        color: "text-blue-500",
        borderColor: "border-blue-500",
        text: "IN PROGRESS",
        Icon: Clock,
      };
    case "done":
      return {
        color: "text-green-500",
        borderColor: "border-green-500",
        text: "DONE",
        Icon: CheckCircle2,
      };
    case "undone":
    default:
      return {
        color: "text-slate-800 dark:text-slate-400",
        borderColor: "border-slate-800 dark:border-slate-500",
        text: "UNDONE",
        Icon: XCircle,
      };
  }
};
