"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProjectDesign } from "@/actions/design.actions";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    setIsDeleting(true);
    const res = await deleteProjectDesign(id);
    if (!res.success) {
      alert("Failed to delete project");
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Project"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}