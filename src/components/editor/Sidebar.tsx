"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { PaintBucket, Wand2, Calculator, Loader2, Sparkles, Layers, Save } from "lucide-react";
import { generateDesignSuggestion } from "@/actions/ai.actions";
import { saveProjectDesign } from "@/actions/design.actions";
import toast from "react-hot-toast"; // Naya import toast notifications ke liye

export default function Sidebar() {
  const { 
    wallColor, setWallColor, 
    budget, setBudget, 
    plotSize, 
    aiSuggestion, setAiSuggestion,
    floorTexture, setFloorTexture 
  } = useEditorStore();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const colors = [
    { name: "White", hex: "#ffffff" },
    { name: "Cream", hex: "#fef3c7" },
    { name: "Sage Green", hex: "#bbf7d0" },
    { name: "Slate", hex: "#94a3b8" },
  ];

  const floorTypes = [
    { id: "marble", name: "Premium Marble" },
    { id: "wood", name: "Teak Wood" },
    { id: "concrete", name: "Raw Concrete" },
  ];

  const handleAIGeneration = async () => {
    setIsGenerating(true);
    const res = await generateDesignSuggestion(budget, wallColor, plotSize);
    if (res.success && res.suggestion) {
      setAiSuggestion(res.suggestion);
    } else {
      setAiSuggestion("Could not generate suggestions at this time.");
    }
    setIsGenerating(false);
  };

  // UPDATED: Ab ye alerts ki jagah professional animated promise handle karega
  const handleSaveProject = async () => {
    setIsSaving(true);
    
    toast.promise(
      saveProjectDesign({
        plotSize,
        floorTexture,
        wallColor,
        budget,
        aiSuggestion
      }),
      {
        loading: 'Saving your design to cloud...',
        success: (res) => {
          if (!res.success) throw new Error("Backend failed");
          return `Design saved successfully!`;
        },
        error: 'Failed to save project. Please check your database connection.',
      }
    ).finally(() => {
      setIsSaving(false);
    });
  };

  return (
    <aside className="w-full md:w-96 h-[50vh] md:h-full bg-white border-t md:border-t-0 md:border-l border-gray-200 shadow-xl flex flex-col z-20 relative">
      
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-indigo-600" />
          Design Studio
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1 hidden md:block">Customize your {plotSize} layout</p>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 pb-36">
        
        {/* Floor Material Selector */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-gray-500" />
            <h3 className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wider">Floor Material</h3>
          </div>
          <div className="flex flex-col gap-2">
            {floorTypes.map((floor) => (
              <button
                key={floor.id}
                onClick={() => setFloorTexture(floor.id)}
                className={`text-left px-3 py-2 md:px-4 md:py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  floorTexture === floor.id 
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700" 
                    : "border-gray-200 text-gray-600 hover:border-indigo-300"
                }`}
              >
                {floor.name}
              </button>
            ))}
          </div>
        </section>

        {/* Wall Color Changer */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <PaintBucket className="w-4 h-4 text-gray-500" />
            <h3 className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wider">Wall Color</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setWallColor(c.hex)}
                className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
                  wallColor === c.hex ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-md shadow-sm border border-gray-200" style={{ backgroundColor: c.hex }} />
                <span className="text-xs font-medium text-gray-700">{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Budget Slider */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-gray-500" />
            <h3 className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wider">Project Budget</h3>
          </div>
          <div className="space-y-3">
            <input
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between items-center text-xs md:text-sm font-medium">
              <span className="text-gray-500">Min</span>
              <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-1 md:px-3 md:py-1 rounded-full">
                ₹{(budget / 100000).toFixed(2)} L
              </span>
            </div>
          </div>
        </section>

        {/* AI Suggestion Output Box */}
        {aiSuggestion && (
          <section className="bg-indigo-50 border border-indigo-100 p-3 md:p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-indigo-700">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-xs md:text-sm">AI Architect Suggestion</h3>
            </div>
            <p className="text-xs md:text-sm text-indigo-900 leading-relaxed">{aiSuggestion}</p>
          </section>
        )}
      </div>

      {/* Action Buttons at the Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 border-t border-gray-100 bg-white flex flex-col gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleAIGeneration}
          disabled={isGenerating}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 md:py-2.5 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          {isGenerating ? "Analyzing Space..." : "Generate AI Suggestions"}
        </button>

        <button 
          onClick={handleSaveProject}
          disabled={isSaving}
          className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 font-medium py-2 md:py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save Project"}
        </button>
      </div>
    </aside>
  );
}