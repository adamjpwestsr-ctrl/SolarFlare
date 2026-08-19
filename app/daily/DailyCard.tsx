"use client";

import { motion } from "framer-motion";

export default function DailyCard({ daily }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="theme-bg p-8 md:p-12 ipad-card rounded-3xl 
                 shadow-2xl max-w-xl text-center mx-auto"
    >
      <div className="text-6xl md:text-7xl mb-4">✨</div>

      <h2 className="text-2xl md:text-3xl ipad-text-2xl font-bold mb-2">
        {daily.category}
      </h2>

      <p className="text-lg md:text-xl ipad-text-xl opacity-90">
        {daily.fact}
      </p>

      <p className="mt-6 text-sm md:text-base opacity-70">
        Discovered on {daily.date}
      </p>
    </motion.div>
  );
}
