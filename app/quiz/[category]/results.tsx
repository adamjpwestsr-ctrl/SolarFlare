"use client";

import { useEffect, useState } from "react";
import { calculateScore } from "@/lib/quizScoring";
import { unlockQuizBadge } from "@/lib/badgeManager";
import BadgeEarnedOverlay from "@/components/BadgeEarnedOverlay";
import Link from "next/link";

export default function QuizResultsPage({ searchParams }) {
  const { answers, explorerId, category } = searchParams;

  // answers comes in as a JSON string → parse it
  const parsedAnswers = JSON.parse(answers);

  const [badge, setBadge] = useState(null);
  const result = calculateScore(parsedAnswers);

  useEffect(() => {
    async function checkBadge() {
      const earned = await unlockQuizBadge(explorerId, result.score);
      if (earned) setBadge(earned);
    }
    checkBadge();
  }, [explorerId, result.score]);

  return (
    <div className="min-h-screen bg-black text-white p-10 text-center relative">

      {/* Badge celebration overlay */}
      {badge && <BadgeEarnedOverlay badge={badge} />}

      <h1 className="text-4xl font-bold theme-text mb-6">
        Quiz Results: {decodeURIComponent(category)}
      </h1>

      <div className="bg-white/10 p-6 rounded-2xl border border-white/20 max-w-xl mx-auto">
        <p className="text-2xl mb-4">
          You scored <span className="font-bold">{result.score}%</span>
        </p>

        <p className="text-lg opacity-80 mb-6">
          {result.correct} correct out of {result.total}
        </p>

        {badge && (
          <div className="mt-6 text-xl">
            🎉 Badge Earned: <span className="font-bold">{badge.name}</span>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-4 items-center">
        <Link
          href={`/quiz/${encodeURIComponent(category)}`}
          className="bg-indigo-700 hover:bg-indigo-600 px-6 py-3 rounded-xl text-lg"
        >
          Try Again
        </Link>

        <Link
          href="/quiz"
          className="text-indigo-400 hover:text-indigo-300 text-lg"
        >
          ← Back to Quiz Hub
        </Link>
      </div>
    </div>
  );
}
