"use client";

import { motion } from "framer-motion";

export default function QuizQuestion({ question, onAnswer, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-gray-900 p-6 md:p-10 ipad-card rounded-3xl 
                 shadow-xl max-w-xl mx-auto landscape-center"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 theme-text">
        Question {index + 1} of {total}
      </h2>

      <p className="text-lg md:text-xl mb-6">{question.question}</p>

      <div className="grid gap-4">
        {question.options.map((opt, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={() => onAnswer(opt === question.correct)}
            className="theme-bg hover:opacity-90
                       p-4 md:p-6 ipad-card rounded-xl 
                       text-left text-lg md:text-xl shadow-lg border border-white/10"
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
