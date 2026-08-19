"use client";

import { useState, useEffect } from "react";
import { getExplorerLocal, updateExplorerSettings } from "@/lib/identity";
import { useRouter } from "next/navigation";

const avatars = ["🚀", "🛸", "👨‍🚀", "🌌", "✨", "🪐", "🌠"];
const themes = ["indigo", "purple", "blue", "emerald", "rose", "amber"];

export default function ExplorerSettingsPage() {
  const router = useRouter();
  const explorer = getExplorerLocal();

  const [name, setName] = useState(explorer?.name || "");
  const [avatar, setAvatar] = useState(explorer?.avatar || "🚀");
  const [theme, setTheme] = useState(explorer?.theme || "indigo");
  const [title, setTitle] = useState(explorer?.title || "Explorer");

  async function save() {
    await updateExplorerSettings(explorer.id, {
      name,
      avatar,
      theme,
      title
    });

    router.push("/passport");
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 landscape-center">
      <h1 className="text-4xl font-bold text-center mb-8">Explorer Settings</h1>

      {/* NAME */}
      <div className="mb-8">
        <label className="block mb-2 opacity-80">Explorer Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 text-white"
        />
      </div>

      {/* TITLE */}
      <div className="mb-8">
        <label className="block mb-2 opacity-80">Explorer Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 text-white"
        />
      </div>

      {/* AVATAR PICKER */}
      <div className="mb-8">
        <label className="block mb-2 opacity-80">Avatar</label>
        <div className="grid grid-cols-7 gap-4">
          {avatars.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`text-4xl p-3 rounded-xl ${
                avatar === a ? "bg-indigo-600" : "bg-gray-800"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* THEME PICKER */}
      <div className="mb-8">
        <label className="block mb-2 opacity-80">Theme Color</label>
        <div className="grid grid-cols-6 gap-4">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`p-4 rounded-xl ${
                theme === t ? `bg-${t}-600` : "bg-gray-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={save}
        className="w-full bg-indigo-600 hover:bg-indigo-500 p-4 rounded-xl text-xl font-bold mt-10"
      >
        Save Settings
      </button>
    </div>
  );
}
