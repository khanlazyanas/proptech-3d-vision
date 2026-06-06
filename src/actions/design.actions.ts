"use server";

import { connectToDatabase } from "@/lib/db";
import SavedDesign from "@/models/SavedDesign";
import { revalidatePath } from "next/cache";

export async function saveProjectDesign(data: {
  plotSize: string;
  floorTexture: string;
  wallColor: string;
  budget: number;
  aiSuggestion: string | null;
}) {
  try {
    await connectToDatabase();
    const newDesign = await SavedDesign.create({
      projectName: `Project ${new Date().toLocaleDateString()}`,
      plotSize: data.plotSize,
      floorTexture: data.floorTexture,
      wallColor: data.wallColor,
      budget: data.budget,
      aiSuggestion: data.aiSuggestion || "",
    });
    return { success: true, id: newDesign._id.toString() };
  } catch (error) {
    console.error("Database Save Error:", error);
    return { success: false, error: "Failed to save project to database." };
  }
}

export async function deleteProjectDesign(id: string) {
  try {
    await connectToDatabase();
    await SavedDesign.findByIdAndDelete(id);
    
    revalidatePath("/dashboard"); 
    return { success: true };
  } catch (error) {
    console.error("Database Delete Error:", error);
    return { success: false, error: "Failed to delete project." };
  }
}