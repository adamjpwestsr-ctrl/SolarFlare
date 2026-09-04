"use client";

import { useEffect, useState } from "react";
import Collectible from "./Collectible";
import collectiblesData from "../data/collectibles.json";

interface CollectibleManagerProps {
  zone: {
    id: string;
    collectibles: string[];
    difficulty: number;
  };
  width: number;
  height: number;
}

export default function CollectibleManager({ zone, width, height }: CollectibleManagerProps) {
  const [collectibles, setCollectibles] = useState<
    {
      id: string;
      x: number;
      y: number;
      radius: number;
      name: string;
      points: number;
      rarity: string;
    }[]
  >([]);

  useEffect(() => {
    const spawnCount = Math.min(5 + zone.difficulty, 12);

    const newCollectibles = Array.from({ length: spawnCount }).map((_, i) => {
      const collectibleId = zone.collectibles[i % zone.collectibles.length];
      const item = collectiblesData.find((c) => c.id === collectibleId)!;

      return {
        id: `${collectibleId}-${Date.now()}-${i}`,
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 20,
        name: item.name,
        points: item.points,
        rarity: item.rarity ?? "common"
      };
    });

    setCollectibles(newCollectibles);
  }, [zone, width, height]);

  // Optional sparkle respawn
  useEffect(() => {
    const interval = setInterval(() => {
      setCollectibles((prev) =>
        prev.map((c) => ({
          ...c,
          x: Math.random() * width,
          y: Math.random() * height
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [width, height]);

  return (
    <>
      {collectibles.map((c) => (
        <Collectible key={c.id} {...c} />
      ))}
    </>
  );
}
