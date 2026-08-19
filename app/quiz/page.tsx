"use client";

import PageTransition from "@/app/components/PageTransition";
import Link from "next/link";
import { motion } from "framer-motion";
import quizzes from "@/data/quizzes.json";

export default function QuizHub() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white p-6 landscape-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center theme-text">
          Quiz Hub
        </h1>

        <p className="opacity-80 text-center mb-10 text-lg md:text-xl">
          Choose a cosmic category to begin your mission
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 ipad-grid">
          {quizzes.quizzes.map((q) => (
            <motion.div
              key={q.category}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={`/quiz/${q.category}`}
                className="block theme-bg hover:opacity-90 p-6 rounded-2xl 
                           text-center shadow-lg border border-white/10"
              >
                <span className="text-xl md:text-2xl font-bold">
                  {q.category}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
