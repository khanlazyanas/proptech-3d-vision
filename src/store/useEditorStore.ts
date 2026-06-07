import { create } from 'zustand';

interface EditorState {
  plotSize: string;
  floorTexture: string;
  wallColor: string;
  budget: number;
  aiSuggestion: string | null;
  lightingTheme: 'day' | 'night'; // NAYA FEATURE
  
  setPlotSize: (size: string) => void;
  setFloorTexture: (texture: string) => void;
  setWallColor: (color: string) => void;
  setBudget: (budget: number) => void;
  setAiSuggestion: (suggestion: string | null) => void;
  setLightingTheme: (theme: 'day' | 'night') => void; // NAYA FEATURE
}

export const useEditorStore = create<EditorState>((set) => ({
  plotSize: '30x50', 
  floorTexture: 'marble',
  wallColor: '#ffffff',
  budget: 500000,
  aiSuggestion: null,
  lightingTheme: 'day',

  setPlotSize: (size) => set({ plotSize: size }),
  setFloorTexture: (texture) => set({ floorTexture: texture }),
  setWallColor: (color) => set({ wallColor: color }),
  setBudget: (budget) => set({ budget }),
  setAiSuggestion: (suggestion) => set({ aiSuggestion: suggestion }),
  setLightingTheme: (theme) => set({ lightingTheme: theme }),
}));