// lib/quizGenerator.ts
import factsData from "@/data/facts.json";

const QUESTION_TEMPLATES = [
  (cat) => `Which fact is true about ${cat}?`,
  (cat) => `Which statement describes ${cat}?`,
  (cat) => `Which of these belongs to the category ${cat}?`,
  (cat) => `Which fact correctly matches ${cat}?`
];

export function generateQuizForCategory(category, count = 10, difficulty = 1) {
  const categoryBlock = factsData.facts.find((f) => f.category === category);
  if (!categoryBlock) throw new Error(`Category not found: ${category}`);

  const correctFacts = [...categoryBlock.facts];
  const allOtherFacts = factsData.facts
    .filter((f) => f.category !== category)
    .flatMap((f) => f.facts);

  const questions = [];

  for (let i = 0; i < count; i++) {
    const correct = correctFacts[Math.floor(Math.random() * correctFacts.length)];

    // Pick distractors from other categories
    const distractors = shuffle(allOtherFacts)
      .filter((d) => d !== correct)
      .slice(0, 3);

    const prompt =
      QUESTION_TEMPLATES[Math.floor(Math.random() * QUESTION_TEMPLATES.length)](
        category
      );

    const options = shuffle([correct, ...distractors]);

    questions.push({
      id: `${category}-${i}`,
      prompt,
      correct,
      options
    });
  }

  return questions;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
