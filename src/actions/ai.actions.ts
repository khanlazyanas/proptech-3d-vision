"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini SDK with the API key from .env
// Note: Ensure you have added GEMINI_API_KEY to your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateDesignSuggestion(budget: number, wallColor: string, plotSize: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is missing.");
    }

    // Using the fastest model for real-time UI responses
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Act as a premium Indian Interior Architect. 
    The user is designing a ${plotSize} ft narrow plot house.
    They have selected a wall color hex of ${wallColor} and have a total interior budget of ₹${budget} INR.
    Provide a concise, 3-sentence professional recommendation on what type of furniture materials (e.g., Teak wood, minimal metal) and lighting would best suit this budget and wall color in the Indian context. Do not use markdown, just plain text.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return { success: true, suggestion: text };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { success: false, error: "AI failed to generate a response. Please try again." };
  }
}