"use client";

import { useState } from "react";
import { getExplorerLocal, createExplorer } from "@/lib/identity";
import { useRouter } from "next/navigation";

export default function ExplorersPage() {
  const router = useRouter();
  const existing = getExplorerLocal();

  const [name, setName] = useState("");

  async function handleCreate() {
    if (!name.trim()) return;
    await createExplorer(name.trim());
    router.push("/passport");
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Explorer</h1>

      {/* If explorer already exists */}
      {existing ? (
        <div className="bg-indigo-800 p-6 rounded-xl text-center">
          <div className="text-4xl mb-2">{existing.avatar}</div>
          <p className="text-xl font-bold mb-4">{existing.name}</p>

          <button
            onClick={() => router.push("/explorers/settings")}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
          >
            Edit Explorer
          </button>
        </div>
      ) : (
        /* Create new explorer */
        <div className="flex flex-col items-center gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Explorer name"
            className="p-3 rounded-lg bg-gray-800 text-white w-full max-w-sm"
          />
          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-bold"
          >
            Create Explorer
          </button>
        </div>
      )}
    </div>
  );
}
