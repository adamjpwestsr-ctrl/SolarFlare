"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function BadgeEarnedOverlay({ badge, onClose }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="bg-indigo-800 p-10 rounded-3xl text-center shadow-2xl relative overflow-hidden"
      >
        {/* Cosmic glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-purple-500/40 blur-2xl"
        />

        {/* Badge Icon */}
        <div className="relative text-7xl mb-4 drop-shadow-xl">
          {badge.icon || "🏅"}
        </div>

        {/* Title */}
        <h1 className="relative text-4xl font-bold mb-2 theme-text">
          Badge Earned!
        </h1>

        {/* Badge Name */}
        <p className="relative text-xl opacity-90 mb-6">{badge.name}</p>

        {/* Continue Button */}
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="relative bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl text-lg transition"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}
