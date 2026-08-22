function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ");
}

export function calculateScore(
  answers: { correctAnswers: string[]; userAnswer: string }[]
) {
  let correct = 0;

  for (const a of answers) {
    const user = normalize(a.userAnswer);

    const normalizedCorrect = a.correctAnswers.map(normalize);

    const isCorrect = normalizedCorrect.some((c) => c === user);

    if (isCorrect) correct++;
  }

  const total = answers.length;
  const score = Math.round((correct / total) * 100);

  return { total, correct, score };
}
