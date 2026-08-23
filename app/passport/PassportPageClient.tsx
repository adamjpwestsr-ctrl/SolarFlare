"use client";

import { useEffect, useState } from "react";
import { getExplorerLocal } from "@/lib/identity";
import { getExplorerXP } from "@/lib/quizXP";
import { getBadges, getExplorerBadges } from "@/lib/badgeManager";
import { refreshExplorer } from "@/lib/passport";

export default function PassportPageClient() {
  const [explorer, setExplorer] = useState(null);
  const [xpData, setXpData] = useState({ xp: 0, level: 0 });
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    const e = getExplorerLocal();
    if (!e) return;

    setExplorer(e);

    async function load() {
      const xp = await getExplorerXP(e.id);
      setXpData(xp);

      const earned = await getExplorerBadges(e.id);
      setEarnedBadges(earned);

      // Refresh explorer to avoid stale data
      await refreshExplorer(e.id);
    }

    load();
  }, []);

  if (!explorer) {
    return (
      <div className="p-6 text-center theme-text">
        Loading Passport...
      </div>
    );
  }

  const allBadges = getBadges();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold theme-text mb-6">Cosmic Passport</h1>

      <div className="bg-gray-900 p-6 rounded-xl border-2 border-white/20 shadow-xl mb-8">
        <h2 className="text-xl font-bold mb-2 theme-text">
          Explorer: {explorer.name}
        </h2>
        <p className="text-lg">XP: {xpData.xp}</p>
        <p className="text-lg">Level: {xpData.level}</p>
      </div>

      <h2 className="text-2xl font-bold theme-text mb-4">Badges</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allBadges.map((badge) => {
          const earned = earnedBadges.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`rounded-xl p-4 text-center border-2 shadow-xl ${
                earned ? "theme-bg border-white/20" : "bg-gray-800 opacity-50 border-gray-700"
              }`}
            >
              <div className="text-5xl mb-3">{badge.icon}</div>
              <h3 className="text-lg font-bold">{badge.name}</h3>
              <p className="text-sm mt-2">
                {earned ? "Earned" : "Locked"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
