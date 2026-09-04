"use client";

import { useEffect, useState } from "react";

interface ZoneCompleteProps {
  zoneName: string;
  score: number;
  onContinue: () => void;
}

export default function ZoneComplete({ zoneName, score, onContinue }: ZoneCompleteProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onContinue();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-xl flex flex-col items-center justify-center text-white z-50 zone-complete-warp">
      
      {/* Flash */}
      <div className="zone-complete-flash" />

      {/* Title */}
      <h1 className="text-6xl font-extrabold mb-6 zone-complete-title drop-shadow-xl">
        Zone Complete
      </h1>

      {/* Zone Name */}
      <p className="text-3xl opacity-90 mb-4">{zoneName}</p>

      {/* Score */}
      <p className="text-xl opacity-80 mb-8">Score Earned: {score}</p>

      {/* Manual Continue */}
      <button
        onClick={() => {
          setVisible(false);
          onContinue();
        }}
        className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-2xl transition"
      >
        Continue
      </button>
    </div>
  );
}
