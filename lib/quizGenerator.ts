import factsData from "@/data/facts.json";

export interface QuizQuestion {
  question: string;
  correctAnswers: string[];
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

  // Remove duplicate facts
  const uniqueFacts = [...new Set(facts)];

  // Pull wrong answers from ALL OTHER categories
  const allOtherFacts = factsData.facts
    .filter((f) => f.category !== categoryData.category)
    .flatMap((f) => f.facts);

  const questions: QuizQuestion[] = uniqueFacts.map((fact) => {
    const correctAnswers = [fact];

    // Wrong answers from other categories (much better variety)
    const wrongOptions = shuffle(allOtherFacts).slice(0, 3);

    // Unique question prompt per fact
    const questionText = `Which statement about ${categoryData.category} is correct?`;

    return {
      question: questionText,
      correctAnswers,
      options: shuffle([...correctAnswers, ...wrongOptions])
    };
  });

  // Shuffle and slice unique questions
  return shuffle(questions).slice(0, count);
}
