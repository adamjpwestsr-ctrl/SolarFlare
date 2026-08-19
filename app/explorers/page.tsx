"use client";

import { useEffect, useState } from "react";
import { listExplorers, setActiveExplorer, createExplorer } from "@/lib/identity";
import { useRouter } from "next/navigation";

export default function ExplorersPage() {
  const [explorers, setExplorers] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const list = await listExplorers();
      setExplorers(list);
    }
    load();
  }, []);

  async function handleSetActive(id: string) {
    await setActiveExplorer(id);
    router.push("/passport");
  }

  async function handleCreate() {
    if (!name.trim()) return;
    await createExplorer(name.trim());
    setName("");
    const list = await listExplorers();
    setExplorers(list);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Explorers</h1>

      <div className="mb-8 flex gap-2 justify-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New explorer name"
          className="p-2 rounded-lg bg-gray-800 text-white"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
        >
          Add Explorer
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {explorers.map((e) => (
          <div
            key={e.id}
            className="bg-indigo-800 p-4 rounded-xl flex flex-col items-center"
          >
            <div className="text-2xl mb-2">🚀</div>
            <p className="font-bold mb-2">{e.name}</p>
            <button
              onClick={() => handleSetActive(e.id)}
              className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg text-sm"
            >
              Set Active
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
