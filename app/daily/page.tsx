"use client";

import { useEffect, useState } from "react";
import PageTransition from "@/app/components/PageTransition";
import {
  getDailyFact,
  getStreakLocal,
  getStreakFromSupabase,
  logDailyToSupabase,
  awardDailyStamp
} from "@/lib/daily";
import DailyCard from "./DailyCard";

export default function DailyDiscoveryPage() {
  const [daily, setDaily] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function load() {
      const d = getDailyFact();
      setDaily(d);

      // Log to Supabase
      await logDailyToSupabase(d);

      // Award daily stamp
      await awardDailyStamp(d);

      // Cloud streak (fallback to local)
      const cloudStreak = await getStreakFromSupabase();
      setStreak(cloudStreak || getStreakLocal());
    }

    load();
  }, []);

  if (!daily) return null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center landscape-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 theme-text">
          Daily Discovery
        </h1>

        <p className="opacity-80 mb-6 text-lg md:text-xl">
          Your cosmic fact for today
        </p>

        <DailyCard daily={daily} />

        <div className="mt-10 text-center">
          <p className="text-xl md:text-2xl">
            Streak:{" "}
            <span className="font-bold theme-text">
              {streak} days
            </span>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
