"use server";

import { connectToDatabase } from "@/lib/db";
import SavedDesign from "@/models/SavedDesign";

export async function saveProjectDesign(data: {
  plotSize: string;
  floorTexture: string;
  wallColor: string;
  budget: number;
  aiSuggestion: string | null;
}) {
  try {
    await connectToDatabase();

    // Create a new document in MongoDB
    const newDesign = await SavedDesign.create({
      projectName: `Project ${new Date().toLocaleDateString()}`,
      plotSize: data.plotSize,
      floorTexture: data.floorTexture,
      wallColor: data.wallColor,
      budget: data.budget,
      aiSuggestion: data.aiSuggestion || "",
    });

    // Mongoose object ko plain JS object mein convert kar rahe hain taaki client ko bhej sakein
    return { success: true, id: newDesign._id.toString() };
  } catch (error) {
    console.error("Database Save Error:", error);
    return { success: false, error: "Failed to save project to database." };
  }
}