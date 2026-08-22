"use client";

import { motion } from "framer-motion";

export default function QuizAnswerAnimation({ correct }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-0 z-40 pointer-events-none ${
        correct ? "bg-emerald-500/40" : "bg-rose-500/40"
      }`}
    />
  );
}
