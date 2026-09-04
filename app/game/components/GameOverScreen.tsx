"use client";

interface GameOverScreenProps {
  score: number;
  zoneName: string;
  onRestart: () => void;
}

export default function GameOverScreen({ score, zoneName, onRestart }: GameOverScreenProps) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center text-white z-50">
      <h2 className="text-5xl font-extrabold mb-4">Game Over</h2>

      <p className="text-2xl mb-2">Zone: {zoneName}</p>
      <p className="text-3xl font-bold text-yellow-300 mb-8">Final Score: {score}</p>

      <button
        onClick={onRestart}
        className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-2xl transition"
      >
        Restart
      </button>
    </div>
  );
}
