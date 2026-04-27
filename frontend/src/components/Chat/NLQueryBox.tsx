"use client";

import { Send, Sparkles } from "lucide-react";
import { useState } from "react";

export default function NLQueryBox() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("Submitting NL query to Gemini:", query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Sparkles size={16} className="text-purple-500 group-focus-within:animate-pulse" />
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask anything (e.g. 'Show shipments in MH')"
        className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-3 pl-10 pr-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
      />
      <button 
        type="submit"
        className="absolute right-2 top-1.5 p-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Send size={16} />
      </button>
    </form>
  );
}
