"use client";

import { useState, useEffect } from "react";
import { getExplorerLocal } from "@/lib/identity";
import CosmicIDCard from "./CosmicIDCard";

export default function ReturningExplorer() {
  const [name, setName] = useState("");
  const [explorer, setExplorer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Automatically load local explorer if one exists
    const localExplorer = getExplorerLocal();
    if (localExplorer) setExplorer(localExplorer);
  }, []);

  function handleReturn() {
    const localExplorer = getExplorerLocal();
    if (!localExplorer || localExplorer.name.trim().toLowerCase() !== name.trim().toLowerCase()) {
      setError("Explorer not found. Try again.");
      return;
    }
    setExplorer(localExplorer);
  }

  if (explorer) return <CosmicIDCard explorer={explorer} />;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome Back, Explorer</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your cosmic name"
        className="p-3 rounded-xl bg-gray-800 text-white w-64 text-center mb-4"
      />

      <button
        onClick={handleReturn}
        className="bg-blue-600 hover:bg-blue-500 p-3 rounded-xl text-xl"
      >
        Continue Mission
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
}
