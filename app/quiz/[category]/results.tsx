"use client";

import { unlockBadge } from "@/lib/badgeManager";
import { motion } from "framer-motion";

export default function QuizResults({ score, category, explorerId }) {
  const passed = score >= 80;

  // FIX: unlockBadge requires explorerId + category
  // FIX: unlockBadge is async → must await
  const getBadge = async () => {
    if (!passed) return null;
    return await unlockBadge(explorerId, category);
  };

  const [badge, setBadge] = React.useState(null);

  React.useEffect(() => {
    getBadge().then(setBadge);
  }, [passed, explorerId, category]);

  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-6">
        {passed ? "Mission Success!" : "Mission Incomplete"}
      </h1>

      <p className="text-xl mb-6">
        You scored {score}%
      </p>

      {passed && badge && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-indigo-700 p-6 rounded-3xl inline-block shadow-2xl"
        >
          <div className="text-6xl mb-4">{badge.icon}</div>
          <h2 className="text-2xl font-bold">{badge.name}</h2>
          <p className="opacity-80 mt-2">Added to your Cosmic Passport</p>
        </motion.div>
      )}

      {!passed && (
        <p className="text-lg opacity-70 mt-4">
          Study the facts and try again
        </p>
      )}
    </div>
  );
}
