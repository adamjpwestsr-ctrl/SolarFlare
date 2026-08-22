import factsData from "@/data/facts.json";

export interface QuizQuestion {
  question: string;
  correct: string;
  options: string[];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function generateQuizForCategory(
  category: string,
  count: number = 10
): QuizQuestion[] {
  const decoded = decodeURIComponent(category);

  const categoryData = factsData.facts.find(
    (item) => item.category.toLowerCase() === decoded.toLowerCase()
  );

  if (!categoryData) return [];

  const facts = categoryData.facts;

  const questions: QuizQuestion[] = facts.map((fact) => {
    const correct = fact;

    const wrongOptions = shuffle(
      facts.filter((f) => f !== fact)
    ).slice(0, 3);

    return {
      question: `Which of the following is true about ${categoryData.category}?`,
      correct,
      options: shuffle([correct, ...wrongOptions])
    };
  });

  const max = Math.min(count, questions.length);
  const min = Math.min(5, max);
  const target = Math.max(min, Math.min(10, max));

  return shuffle(questions).slice(0, target);
}
