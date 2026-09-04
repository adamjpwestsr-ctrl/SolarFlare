"use client";

import { useState } from "react";

export default function useBurstManager() {
  const [bursts, setBursts] = useState<
    { id: string; x: number; y: number; rarity: string }[]
  >([]);

  const spawnBurst = (x: number, y: number, rarity: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setBursts((prev) => [...prev, { id, x, y, rarity }]);

    // Remove burst after animation
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 600);
  };

  return { bursts, spawnBurst };
}
