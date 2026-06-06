"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProjectDesign } from "@/actions/design.actions";
import toast from "react-hot-toast";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Professional standard confirmation
    if (!confirm("Are you sure you want to permanently delete this project?")) return;
    
    setIsDeleting(true);
    const toastId = toast.loading("Deleting project...");

    const res = await deleteProjectDesign(id);
    
    if (res.success) {
      toast.success("Project deleted", { id: toastId });
    } else {
      toast.error("Failed to delete", { id: toastId });
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Project"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}