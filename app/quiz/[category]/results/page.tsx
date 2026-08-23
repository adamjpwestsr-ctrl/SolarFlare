"use client";

import { useEffect, useState } from "react";
import { addXP, calculateXP } from "@/lib/quizXP";
import { getExplorerLocal } from "@/lib/identity";
import BadgeEarnedOverlay from "@/components/BadgeEarnedOverlay";
import { getBadges } from "@/lib/badgeManager";

export default function QuizResultsPage({ params }) {
  const { category } = params;
  const [explorer, setExplorer] = useState(null);
  const [results, setResults] = useState(null);
  const [earnedBadge, setEarnedBadge] = useState(null);

  useEffect(() => {
    const e = getExplorerLocal();
    setExplorer(e);

    const stored = localStorage.getItem("quizResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!results || !explorer) return;

    const xp = calculateXP(results.correct, results.total);
    addXP(explorer.id, xp);

    // Badge unlock logic
    const badges = getBadges();
    const badge = badges.find((b) => b.category === category);

    if (badge && results.correct === results.total) {
      setEarnedBadge(badge);
    }
  }, [results, explorer]);

  if (!results) {
    return (
      <div className="p-6 text-center theme-text">
        Loading results...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold theme-text mb-6">
        {category} Quiz Results
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl border-2 border-white/20 shadow-xl mb-8">
        <p className="text-xl mb-2">Correct: {results.correct}</p>
        <p className="text-xl mb-2">Total: {results.total}</p>
        <p className="text-xl theme-text">
          Score: {Math.round((results.correct / results.total) * 100)}%
        </p>
      </div>

      {earnedBadge && (
        <BadgeEarnedOverlay
          badge={earnedBadge}
          explorerId={explorer.id}
          onClose={() => setEarnedBadge(null)}
        />
      )}
    </div>
  );
}
