"use client";

import { motion } from "framer-motion";

export default function DailyStampCard({ stamp }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="p-4 md:p-6 ipad-card rounded-xl shadow-xl text-center 
                 border-2 theme-border bg-gray-900"
    >
      <div className="text-4xl md:text-5xl mb-2">{stamp.icon}</div>
      <p className="font-bold theme-text">{stamp.label}</p>
      <p className="text-sm opacity-70">{stamp.date}</p>
    </motion.div>
  );
}
