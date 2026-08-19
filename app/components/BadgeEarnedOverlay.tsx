"use client";

import { motion } from "framer-motion";

export default function BadgeEarnedOverlay({ badge }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-indigo-800 p-10 rounded-3xl text-center shadow-2xl"
      >
        <div className="text-7xl mb-4">{badge.icon}</div>
        <h1 className="text-4xl font-bold mb-2">Badge Earned!</h1>
        <p className="text-xl opacity-80">{badge.name}</p>
      </motion.div>
    </motion.div>
  );
}
