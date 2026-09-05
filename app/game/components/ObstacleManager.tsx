"use client";

import { useEffect, useState } from "react";
import Obstacle from "./Obstacle";

interface ObstacleManagerProps {
  zone: {
    id: string;
    hazards: string[];
    difficulty: number;
  };
  width: number;
  height: number;
  transitioning?: boolean;
  onUpdate: (list: { id: string; x: number; y: number; radius: number; type: string }[]) => void;
}

export default function ObstacleManager({
  zone,
  width,
  height,
  transitioning,
  onUpdate
}: ObstacleManagerProps) {
  const [obstacles, setObstacles] = useState<
    { id: string; x: number; y: number; radius: number; type: string }[]
  >([]);

  useEffect(() => {
    const spawnCount = Math.min(3 + zone.difficulty, 10);
    const newObstacles = Array.from({ length: spawnCount }).map((_, i) => {
      const hazardType = zone.hazards[i % zone.hazards.length];
      return {
        id: `${hazardType}-${Date.now()}-${i}`,
        x: Math.random() * width,
        y: Math.random() * height,
        radius: hazardType === "blackhole" ? 50 : 30,
        type: hazardType
      };
    });

    setObstacles(newObstacles);
    onUpdate(newObstacles); // ← send obstacles to GameContainer
  }, [zone, width, height, onUpdate]);

  // Optional drift animation
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) => {
        const drifted = prev.map((o) => ({
          ...o,
          x: (o.x + Math.sin(Date.now() / 1000 + o.radius) * 2 + width) % width,
          y: (o.y + Math.cos(Date.now() / 1000 + o.radius) * 2 + height) % height
        }));

        onUpdate(drifted); // ← keep GameContainer in sync
        return drifted;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [width, height, onUpdate]);

  return (
    <>
      {obstacles.map((o) => (
        <Obstacle key={o.id} {...o} />
      ))}
    </>
  );
}
