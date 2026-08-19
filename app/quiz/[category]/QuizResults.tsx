"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function QuizResults({ score, total, category }) {
  const percent = Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-gray-900 p-8 md:p-12 rounded-3xl shadow-xl 
                 max-w-xl mx-auto text-center ipad-card landscape-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl mb-6"
      >
        🌟
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-bold theme-text mb-4">
        Quiz Complete!
      </h1>

      <p className="text-lg md:text-xl opacity-80 mb-6">
        You finished the <span className="font-bold">{category}</span> quiz.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-2xl md:text-3xl font-bold mb-8"
      >
        Score: <span className="theme-text">{score}</span> / {total}
        <div className="text-lg opacity-70 mt-2">{percent}% correct</div>
      </motion.div>

      <Link
        href="/quiz"
        className="theme-bg hover:opacity-90 p-4 rounded-xl 
                   text-xl font-bold shadow-lg block mt-6"
      >
        Back to Quiz Hub
      </Link>
    </motion.div>
  );
}
