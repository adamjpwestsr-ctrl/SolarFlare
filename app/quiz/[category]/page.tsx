"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { generateQuizForCategory } from "@/lib/quizGenerator";
import QuizAnswerAnimation from "@/components/QuizAnswerAnimation";
import { calculateXP } from "@/lib/quizXP";
import { saveQuizAttempt } from "@/lib/quizHistory";
import { getExplorerLocal } from "@/lib/identity";

// Normalize answers for accurate comparison
function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ");
}

export default function QuizCategoryPage({ params }) {
  const router = useRouter();
  const category = decodeURIComponent(params.category);

  const explorer = getExplorerLocal();
  const explorerId = explorer?.id || "demo-explorer";

  const questions = useMemo(() => generateQuizForCategory(category, 10), [category]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [flash, setFlash] = useState(null);

  const current = questions[index];

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center">
        <h1 className="text-3xl font-bold theme-text">Quiz: {category}</h1>
        <p className="opacity-70 mt-4">No quiz available for this category yet.</p>
      </div>
    );
  }

  async function handleAnswer(opt) {
    const normalizedUser = normalize(opt);

    // Smart Quiz Engine: correct answer is ALWAYS current.correct
    const correctAnswers = [current.correct];
    const normalizedCorrect = correctAnswers.map(normalize);

    const isCorrect = normalizedCorrect.includes(normalizedUser);

    // Flash animation
    setFlash(isCorrect ? "correct" : "incorrect");
    setTimeout(() => setFlash(null), 400);

    // Save answer
    const updated = [
      ...answers,
      {
        correct: isCorrect,
        userAnswer: opt,
        correctAnswers
      }
    ];
    setAnswers(updated);

    // Next question or finish
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      const correctCount = updated.filter((a) => a.correct).length;
      const total = updated.length;
      const score = Math.round((correctCount / total) * 100);
      const xp = calculateXP(correctCount, total);

      await saveQuizAttempt({
        explorerId,
        category,
        score,
        correct: correctCount,
        total
      });

      router.push(
        `/quiz/${encodeURIComponent(category)}/results?answers=${encodeURIComponent(
          JSON.stringify(updated)
        )}&explorerId=${explorerId}&category=${encodeURIComponent(category)}`
      );
    }
  }

  const progress = Math.round(((index + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-black text-white p-10 relative">

      {/* Flash animation */}
      {flash && <QuizAnswerAnimation correct={flash === "correct"} />}

      {/* Progress Bar */}
      <div className="w-full bg-white/20 h-3 rounded-xl mb-8">
        <div
          className="bg-indigo-500 h-3 rounded-xl transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h1 className="text-3xl font-bold theme-text mb-6 text-center">
        Quiz: {category}
      </h1>

      <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-2xl border border-white/20">
        <p className="font-semibold mb-4 text-xl">
          Question {index + 1} of {questions.length}
        </p>

        {/* FIXED: Show Smart Quiz prompt */}
        <p className="text-lg mb-6">{current.prompt}</p>

        <div className="grid gap-3">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="bg-indigo-800 hover:bg-indigo-600 rounded-xl px-4 py-3 text-left text-lg"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
