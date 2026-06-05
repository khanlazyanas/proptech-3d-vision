"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { PaintBucket, Wand2, Calculator, Loader2, Sparkles } from "lucide-react";
import { generateDesignSuggestion } from "@/actions/ai.actions";

export default function Sidebar() {
  const { wallColor, setWallColor, budget, setBudget, plotSize, aiSuggestion, setAiSuggestion } = useEditorStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const colors = [
    { name: "White", hex: "#ffffff" },
    { name: "Cream", hex: "#fef3c7" },
    { name: "Sage Green", hex: "#bbf7d0" },
    { name: "Slate", hex: "#94a3b8" },
  ];

  const handleAIGeneration = async () => {
    setIsGenerating(true);
    // Call our secure Server Action
    const res = await generateDesignSuggestion(budget, wallColor, plotSize);
    
    if (res.success && res.suggestion) {
      setAiSuggestion(res.suggestion);
    } else {
      setAiSuggestion("Could not generate suggestions at this time.");
    }
    setIsGenerating(false);
  };

  return (
    <aside className="w-96 h-full bg-white border-l border-gray-200 shadow-xl flex flex-col z-20 relative">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-indigo-600" />
          Design Studio
        </h2>
        <p className="text-sm text-gray-500 mt-1">Customize your {plotSize} layout</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Wall Color Changer */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <PaintBucket className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Wall Color</h3>
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
                <div className="w-6 h-6 rounded-md shadow-sm border border-gray-200" style={{ backgroundColor: c.hex }} />
                <span className="text-xs font-medium text-gray-700">{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Budget Slider */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Project Budget</h3>
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
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-500">Min</span>
              <span className="text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-full">
                ₹{(budget / 100000).toFixed(2)} Lakhs
              </span>
            </div>
          </div>
        </section>

        {/* AI Suggestion Output Box */}
        {aiSuggestion && (
          <section className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-indigo-700">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-sm">AI Architect Suggestion</h3>
            </div>
            <p className="text-sm text-indigo-900 leading-relaxed">{aiSuggestion}</p>
          </section>
        )}
      </div>

      {/* Action Button */}
      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={handleAIGeneration}
          disabled={isGenerating}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          {isGenerating ? "Analyzing Space..." : "Generate AI Suggestions"}
        </button>
      </div>
    </aside>
  );
}