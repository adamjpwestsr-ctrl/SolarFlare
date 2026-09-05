"use client";

import { useEffect, useState } from "react";

interface ZoneIntroProps {
  zoneName: string;
  onBegin: () => void;
}

export default function ZoneIntro({ zoneName, onBegin }: ZoneIntroProps) {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(3);

  // Countdown logic
  useEffect(() => {
    if (!visible) return;

    if (countdown === 0) {
      setVisible(false);
      onBegin();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, visible, onBegin]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center text-white z-50 animate-fadeIn zone-warp">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg zone-title-flash">
        {zoneName}
      </h1>

      {/* Countdown Number */}
      <div className="text-7xl font-extrabold mb-8 animate-pulse scale-110">
        {countdown}
      </div>

      <button
        onClick={() => {
          setVisible(false);
          onBegin();
        }}
        className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-2xl transition"
      >
        Begin Mission
      </button>
    </div>
  );
}
