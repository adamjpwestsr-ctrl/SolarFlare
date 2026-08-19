"use client";

import { useState } from "react";
import { createExplorer } from "@/lib/identity";
import CosmicIDCard from "./CosmicIDCard";

const suggestions = [
  "StarRider",
  "NebulaKnight",
  "LunarLion",
  "AstroAce",
  "GalaxyGazer"
];

export default function NewExplorer() {
  const [name, setName] = useState("");
  const [created, setCreated] = useState(null);

  function handleCreate() {
    if (!name.trim()) return;
    const explorer = createExplorer(name.trim());
    setCreated(explorer);
  }

  if (created) return <CosmicIDCard explorer={created} />;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Choose Your Cosmic Name</h2>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setName(s)}
            className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-xl"
          >
            {s}
          </button>
        ))}
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your cosmic name"
        className="p-3 rounded-xl bg-gray-800 text-white w-64 text-center mb-4"
      />

      <button
        onClick={handleCreate}
        className="bg-green-600 hover:bg-green-500 p-3 rounded-xl text-xl"
      >
        Create Explorer
      </button>
    </div>
  );
}
