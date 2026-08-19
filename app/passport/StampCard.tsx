"use client";

import { motion } from "framer-motion";

export default function StampCard({ badge, onUnlock }) {
  const isLocked = !badge.earned;

  function handleUnlock() {
    if (isLocked && onUnlock) {
      onUnlock(badge);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleUnlock}
      className={`rounded-xl p-4 text-center shadow-xl border-2 cursor-pointer
        ${isLocked ? "bg-gray-800 opacity-50 border-gray-700" : "theme-bg border-white/20"}`}
    >
      <div className="text-5xl mb-3">{badge.icon}</div>

      <h3 className="text-lg font-bold">{badge.name}</h3>

      {isLocked ? (
        <p className="text-sm opacity-70 mt-2">Locked</p>
      ) : (
        <p className="text-sm theme-text mt-2">Earned!</p>
      )}
    </motion.div>
  );
}
