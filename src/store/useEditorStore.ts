import { create } from 'zustand';

// Strictly typed interface for our 3D Property Editor
interface EditorState {
  plotSize: string;
  floorTexture: string;
  wallColor: string;
  budget: number;
  aiSuggestion: string | null;
  
  // Actions to update the state
  setPlotSize: (size: string) => void;
  setFloorTexture: (texture: string) => void;
  setWallColor: (color: string) => void;
  setBudget: (budget: number) => void;
  setAiSuggestion: (suggestion: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Default values set to an optimal standard layout for our 3D architectural renders
  plotSize: '20x70', 
  floorTexture: 'marble_light',
  wallColor: '#ffffff',
  budget: 500000,
  aiSuggestion: null,

  setPlotSize: (size) => set({ plotSize: size }),
  setFloorTexture: (texture) => set({ floorTexture: texture }),
  setWallColor: (color) => set({ wallColor: color }),
  setBudget: (budget) => set({ budget }),
  setAiSuggestion: (suggestion) => set({ aiSuggestion: suggestion }),
}));