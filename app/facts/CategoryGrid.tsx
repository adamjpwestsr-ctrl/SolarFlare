"use client";

import { useState } from "react";
import FactList from "./FactList";
import factsData from "@/data/facts.json";

interface Props {
  categories: string[];
}

export default function CategoryGrid({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedFacts =
    selectedCategory
      ? factsData.facts.find((c) => c.category === selectedCategory)?.facts ?? []
      : [];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className="bg-indigo-800 rounded-2xl p-4 text-center shadow-lg hover:bg-indigo-600 transition text-lg"
        >
          {category}
        </button>
      ))}

      {selectedCategory && (
        <div className="md:col-span-3 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {selectedCategory} Facts
          </h2>
          <FactList facts={selectedFacts} />
        </div>
      )}
    </div>
  );
}
