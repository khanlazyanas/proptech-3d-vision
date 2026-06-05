import mongoose, { Schema, Document } from "mongoose";

// Strict TypeScript Interface for our Database Document
export interface ISavedDesign extends Document {
  projectName: string;
  plotSize: string;
  floorTexture: string;
  wallColor: string;
  budget: number;
  aiSuggestion: string;
  createdAt: Date;
}

const SavedDesignSchema: Schema = new Schema({
  projectName: { type: String, required: true, default: "My Dream Home" },
  plotSize: { type: String, required: true },
  floorTexture: { type: String, required: true },
  wallColor: { type: String, required: true },
  budget: { type: Number, required: true },
  aiSuggestion: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Next.js mein hot-reloading ki wajah se model baar-baar compile hota hai.
// Isliye pehle check karte hain ki model exist karta hai ya nahi.
const SavedDesign = mongoose.models.SavedDesign || mongoose.model<ISavedDesign>("SavedDesign", SavedDesignSchema);

export default SavedDesign;