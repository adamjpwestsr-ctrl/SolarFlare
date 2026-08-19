"use client";

import { motion } from "framer-motion";

export default function BadgeUnlockModal({ badge, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="bg-gray-900 p-10 rounded-3xl shadow-2xl text-center border-2 theme-border max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-7xl mb-6"
        >
          {badge.icon}
        </motion.div>

        <h2 className="text-3xl font-bold theme-text mb-4">
          Badge Unlocked!
        </h2>

        <p className="text-xl opacity-80 mb-8">{badge.name}</p>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="theme-bg hover:opacity-90 px-6 py-3 rounded-xl text-lg font-bold shadow-lg"
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
