"use client";

import { useState, useCallback } from "react";

interface Zone {
  id: string;
  name: string;
  background: string;
  hazards: string[];
  collectibles: string[];
  difficulty: number;
}

export default function useZoneController(zones: Zone[]) {
  const [index, setIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [zoneComplete, setZoneComplete] = useState(false); // NEW

  const zone = zones[index];

  const startTransition = useCallback(() => {
    setTransitioning(true);
  }, []);

  const triggerIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

  const completeIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  // NEW: Mark zone as complete
  const completeZone = useCallback(() => {
    setZoneComplete(true);
  }, []);

  const nextZone = useCallback(() => {
    if (index >= zones.length - 1) return;

    setZoneComplete(false); // NEW
    startTransition();

    setTimeout(() => {
      setIndex((prev) => prev + 1);
      setShowIntro(true);
      setTransitioning(false);
    }, 600);
  }, [index, zones.length, startTransition]);

  const resetZones = useCallback(() => {
    setIndex(0);
    setShowIntro(true);
    setTransitioning(false);
    setZoneComplete(false); // NEW
  }, []);

  const scaleDifficulty = useCallback(
    (amount: number) => {
      zones[index].difficulty += amount;
    },
    [index, zones]
  );

  return {
    zone,
    index,
    showIntro,
    transitioning,
    zoneComplete,     // NEW
    completeZone,     // NEW
    nextZone,
    resetZones,
    triggerIntro,
    completeIntro,
    scaleDifficulty
  };
}
