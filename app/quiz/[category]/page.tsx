"use client";

import PageTransition from "@/app/components/PageTransition";
import { useState } from "react";
import quizzes from "@/data/quizzes.json";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";

export default function QuizPage({ params }) {
  const category = params.category;
  const quiz = quizzes.quizzes.find((q) => q.category === category);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleAnswer(isCorrect) {
    if (isCorrect) setScore((s) => s + 1);

    if (index + 1 < quiz.questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white p-6 landscape-center">
        {!finished ? (
          <QuizQuestion
            question={quiz.questions[index]}
            onAnswer={handleAnswer}
            index={index}
            total={quiz.questions.length}
          />
        ) : (
          <QuizResults
            score={score}
            total={quiz.questions.length}
            category={category}
          />
        )}
      </div>
    </PageTransition>
  );
}
