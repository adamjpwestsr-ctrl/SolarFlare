"use client";

import { useEffect, useState } from "react";

interface ZoneIntroProps {
  zoneName: string;
  onBegin: () => void;
}

export default function ZoneIntro({ zoneName, onBegin }: ZoneIntroProps) {
  const [visible, setVisible] = useState(true);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onBegin();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onBegin]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center text-white z-50 animate-fadeIn zone-warp">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg zone-title-flash">
        {zoneName}
      </h1>

      <p className="text-xl mb-8 opacity-90">
        Mission initializing…
      </p>

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
