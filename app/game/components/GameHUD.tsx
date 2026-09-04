"use client";

interface GameHUDProps {
  score: number;
  zoneName: string;
  onPause: () => void;
}

export default function GameHUD({ score, zoneName, onPause }: GameHUDProps) {
  return (
    <div className="absolute top-0 left-0 w-full px-4 py-3 bg-black/40 backdrop-blur-md text-white flex justify-between items-center z-50 border-b border-white/10">
      <div className="text-lg font-semibold">{zoneName}</div>

      <div className="text-lg font-bold">
        Score: <span className="text-yellow-300">{score}</span>
      </div>

      <button
        onClick={onPause}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition"
      >
        Pause
      </button>
    </div>
  );
}
