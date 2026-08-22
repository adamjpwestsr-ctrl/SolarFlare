export function calculateScore(answers: { correct: boolean }[]) {
  const total = answers.length;
  const correct = answers.filter(a => a.correct).length;
  const score = Math.round((correct / total) * 100);

  return { total, correct, score };
}
