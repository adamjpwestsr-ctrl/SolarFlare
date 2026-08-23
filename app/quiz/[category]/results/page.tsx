"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BadgeEarnedOverlay from "@/components/BadgeEarnedOverlay";
import { addXP } from "@/lib/quizXP";
import { getBadges } from "@/lib/badgeManager";
import { motion } from "framer-motion";

export default function QuizResultsPage({ params }) {
  const searchParams = useSearchParams();
  const explorerId = searchParams.get("explorerId");
  const category = decodeURIComponent(searchParams.get("category") || "");
  const answersRaw = searchParams.get("answers");

  const [answers, setAnswers] = useState([]);
  const [earnedBadge, setEarnedBadge] = useState(null);
  const [xpAwarded, setXpAwarded] = useState(null);

  useEffect(() => {
    if (!answersRaw) return;

    try {
      const parsed = JSON.parse(answersRaw);
      setAnswers(parsed);

      const correctCount = parsed.filter((a) => a.correct).length;
      const total = parsed.length;
      const score = Math.round((correctCount / total) * 100);

      // Award XP
      const xp = correctCount * 10 + (score === 100 ? 50 : score >= 80 ? 20 : 0);
      setXpAwarded(xp);

      if (explorerId) {
        addXP(explorerId, xp);
      }

      // Badge unlock logic
      const badges = getBadges();
      const badge = badges.find((b) => b.category === category);

      if (badge && score === 100) {
        setEarnedBadge(badge);
      }
    } catch (err) {
      console.error("Failed to parse answers:", err);
    }
  }, [answersRaw, explorerId, category]);

  if (!answers.length) {
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center">
        <h1 className="text-3xl font-bold theme-text">Quiz Results</h1>
        <p className="opacity-70 mt-4">Loading results...</p>
      </div>
    );
  }

  const correctCount = answers.filter((a) => a.correct).length;
  const total = answers.length;
  const score = Math.round((correctCount / total) * 100);

  return (
    <div className="min-h-screen bg-black text-white p-10 relative">
      <h1 className="text-4xl font-bold theme-text mb-6 text-center">
        {category} Quiz Results
      </h1>

      <div className="max-w-xl mx-auto bg-white/10 p-6 rounded-2xl border border-white/20 mb-10">
        <p className="text-xl mb-2">
          Correct: <span className="font-bold">{correctCount}</span>
        </p>
        <p className="text-xl mb-2">
          Total: <span className="font-bold">{total}</span>
        </p>
        <p className="text-2xl font-bold theme-text">
          Score: {score}%
        </p>

        {xpAwarded !== null && (
          <p className="text-lg mt-4 opacity-80">
            XP Earned: <span className="font-bold">{xpAwarded}</span>
          </p>
        )}
      </div>

      {/* Answer Review */}
      <div className="max-w-3xl mx-auto space-y-4">
        {answers.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-xl border ${
              a.correct
                ? "bg-green-700/40 border-green-500"
                : "bg-red-700/40 border-red-500"
            }`}
          >
            <p className="text-lg font-bold mb-2">
              Question {i + 1}
            </p>

            <p className="opacity-90 mb-2">
              <span className="font-semibold">Your Answer:</span> {a.userAnswer}
            </p>

            {!a.correct && (
              <p className="opacity-90">
                <span className="font-semibold">Correct Answer:</span>{" "}
                {a.correctAnswers[0]}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Badge Earned Overlay */}
      {earnedBadge && explorerId && (
        <BadgeEarnedOverlay
          badge={earnedBadge}
          explorerId={explorerId}
          onClose={() => setEarnedBadge(null)}
        />
      )}
    </div>
  );
}
