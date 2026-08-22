"use client";

import { useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { motion } from "framer-motion";
import factsData from "@/data/facts.json";
import { getExplorerXP } from "@/lib/quizXP";
import { getQuizHistory } from "@/lib/quizHistory";

export default function QuizHub() {
  const explorerId = "demo-explorer"; // Replace with real explorer ID

  const [xpData, setXpData] = useState({ xp: 0, level: 0 });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      const xp = await getExplorerXP(explorerId);
      const hist = await getQuizHistory(explorerId);
      setXpData(xp);
      setHistory(hist.slice(0, 5)); // Show last 5 attempts
    }
    load();
  }, []);

  const categories = factsData.facts.map((c) => c.category);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white p-6 landscape-center">

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center theme-text">
          Quiz Hub
        </h1>

        {/* XP + Level */}
        <div className="text-center mb-10">
          <p className="text-xl opacity-80">
            Level <span className="font-bold">{xpData.level}</span>
          </p>
          <p className="text-lg opacity-60">
            {xpData.xp} XP earned
          </p>
        </div>

        {/* Recent Quiz History */}
        {history.length > 0 && (
          <div className="max-w-xl mx-auto mb-10 bg-white/10 p-6 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-bold mb-4 theme-text text-center">
              Recent Quizzes
            </h2>

            <div className="space-y-3">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="bg-white/5 p-3 rounded-xl flex justify-between"
                >
                  <span>{h.category}</span>
                  <span className="opacity-80">{h.score}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Grid */}
        <p className="opacity-80 text-center mb-6 text-lg md:text-xl">
          Choose a cosmic category to begin your mission
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 ipad-grid">
          {categories.map((cat) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={`/quiz/${encodeURIComponent(cat)}`}
                className="block theme-bg hover:opacity-90 p-6 rounded-2xl 
                           text-center shadow-lg border border-white/10"
              >
                <span className="text-xl md:text-2xl font-bold">
                  {cat}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
