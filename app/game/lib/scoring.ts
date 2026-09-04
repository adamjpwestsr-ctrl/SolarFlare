// /app/game/lib/scoring.ts

export function calculateScore(points: number, zoneDifficulty: number = 1): number {
  return Math.floor(points * zoneDifficulty);
}
