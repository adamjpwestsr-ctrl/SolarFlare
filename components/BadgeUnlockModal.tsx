"use client";

import { motion } from "framer-motion";
import { persistBadgeUnlock, awardBadgeXP, refreshExplorer } from "@/lib/passport";

export default function BadgeUnlockModal({ badge, explorerId, onClose }) {
  async function unlock() {
    await persistBadgeUnlock(explorerId, badge.id);
    await awardBadgeXP(explorerId, 50);
    await refreshExplorer(explorerId);

    if (onClose) onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-gray-900 p-6 rounded-xl text-center border-2 border-white/20 shadow-xl max-w-sm"
      >
        <div className="text-6xl mb-4">{badge.icon}</div>
        <h2 className="text-2xl font-bold mb-2 theme-text">Unlock Badge?</h2>
        <p className="text-lg mb-4">{badge.name}</p>

        <button
          onClick={unlock}
          className="px-6 py-3 rounded-lg theme-bg text-white font-bold hover:opacity-90"
        >
          Unlock
        </button>

        <button
          onClick={onClose}
          className="mt-3 px-6 py-3 rounded-lg bg-gray-700 text-white font-bold hover:opacity-80"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
}
