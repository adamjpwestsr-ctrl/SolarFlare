"use client";

import PageTransition from "@/components/PageTransition";
import BadgeUnlockModal from "@/components/BadgeUnlockModal";
import { useEffect, useState } from "react";
import { getBadges, getExplorerBadges } from "@/lib/badgeManager";
import { getExplorerLocal } from "@/lib/identity";
import { getDailyStamps } from "@/lib/daily";
import { getExplorerXP } from "@/lib/quizXP";
import { getQuizHistory } from "@/lib/quizHistory";
import StampCard from "./StampCard";
import DailyStampCard from "./DailyStampCard";

export default function PassportPageClient() {
  const [explorer, setExplorer] = useState<any | null>(null);
  const [badges, setBadges] = useState([]);
  const [stamps, setStamps] = useState([]);
  const [unlocking, setUnlocking] = useState(null);
  const [xpData, setXpData] = useState({ xp: 0, level: 0 });
  const [history, setHistory] = useState([]);

  // Load explorer safely from localStorage
  useEffect(() => {
    const local = getExplorerLocal();
    setExplorer(local);
  }, []);

  // Load badges, stamps, XP, quiz history
  useEffect(() => {
    if (!explorer) return;

    async function load() {
      const allBadges = getBadges();
      const earned = await getExplorerBadges(explorer.id);

      const merged = allBadges.map((b) => ({
        ...b,
        earned: earned.includes(b.id),
        earnedDate: earned.includes(b.id)
          ? new Date().toISOString()
          : null
      }));

      setBadges(merged);

      const stampList = await getDailyStamps(explorer.id);
      setStamps(stampList);

      const xp = await getExplorerXP(explorer.id);
      setXpData(xp);

      const hist = await getQuizHistory(explorer.id);
      setHistory(hist);
    }

    load();
  }, [explorer]);

  // Prevent crash — show loading until explorer exists
  if (!explorer) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
          <p className="opacity-70 text-xl">Loading Passport…</p>
        </div>
      </PageTransition>
    );
  }

  function handleUnlock(badge) {
    setUnlocking(badge);
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white p-6 landscape-center">

        {/* EXPLORER HEADER */}
        <div className="text-center mb-10">
          <div className="text-6xl md:text-7xl mb-2">
            {explorer.avatar}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold theme-text">
            {explorer.name}
          </h1>
          <p className="opacity-70 text-lg md:text-xl mt-2">
            {explorer.title}
          </p>

          {/* XP + Level */}
          <div className="mt-6">
            <p className="text-xl opacity-80">
              Level <span className="font-bold">{xpData.level}</span>
            </p>
            <p className="text-lg opacity-60">
              {xpData.xp} XP earned
            </p>
          </div>
        </div>

        {/* BADGES */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center theme-text">
          Badges
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ipad-grid">
          {badges.map((badge) => (
            <StampCard key={badge.id} badge={badge} onUnlock={handleUnlock} />
          ))}
        </div>

        {/* QUIZ HISTORY */}
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-center theme-text">
          Quiz History
        </h2>

        {history.length === 0 ? (
          <p className="text-center opacity-70">No quizzes taken yet.</p>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {history.map((h) => (
              <div
                key={h.id}
                className="bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between"
              >
                <span>{h.category}</span>
                <span className="opacity-80">{h.score}%</span>
              </div>
            ))}
          </div>
        )}

        {/* DAILY DISCOVERY STAMPS */}
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-center theme-text">
          Daily Discovery Stamps
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ipad-grid">
          {stamps.map((stamp) => (
            <DailyStampCard key={stamp.date} stamp={stamp} />
          ))}
        </div>

        {/* UNLOCK MODAL */}
        {unlocking && (
          <BadgeUnlockModal
            badge={unlocking}
            onClose={() => setUnlocking(null)}
          />
        )}
      </div>
    </PageTransition>
  );
}
