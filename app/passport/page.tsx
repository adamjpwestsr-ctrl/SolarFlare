"use client";

import PageTransition from "@/app/components/PageTransition";
import BadgeUnlockModal from "@/app/components/BadgeUnlockModal";
import { useEffect, useState } from "react";
import { getBadges, getExplorerBadges } from "@/lib/badgeManager";
import { getExplorerLocal } from "@/lib/identity";
import { getDailyStamps } from "@/lib/daily";
import StampCard from "./StampCard";
import DailyStampCard from "./DailyStampCard";

export default function PassportPage() {
  const [badges, setBadges] = useState([]);
  const [stamps, setStamps] = useState([]);
  const [unlocking, setUnlocking] = useState(null);

  const explorer = getExplorerLocal();

  useEffect(() => {
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
    }

    load();
  }, []);

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
