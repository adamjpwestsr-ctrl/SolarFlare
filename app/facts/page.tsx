"use client";

import CategoryGrid from "./CategoryGrid";
import factsData from "@/data/facts.json";

export default function FactsExplorerPage() {
  const categories = factsData.facts.map((c) => c.category);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">SolarFlare Facts Explorer</h1>
      <p className="text-center mb-8 opacity-80">
        Tap a category to explore cosmic facts.
      </p>
      <CategoryGrid categories={categories} />
    </div>
  );
}
