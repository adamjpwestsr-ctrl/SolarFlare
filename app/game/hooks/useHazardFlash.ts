"use client";

import { useState } from "react";

export default function useHazardFlash() {
  const [flashes, setFlashes] = useState<number[]>([]);

  const triggerFlash = () => {
    const id = Date.now();
    setFlashes((prev) => [...prev, id]);

    // Remove flash after animation
    setTimeout(() => {
      setFlashes((prev) => prev.filter((f) => f !== id));
    }, 500);
  };

  return { flashes, triggerFlash };
}
