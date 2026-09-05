"use client";

import { useEffect } from "react";

interface Entity {
  id: string;
  x: number;
  y: number;
  radius: number;
  points?: number;
  rarity?: string;
}


interface UseCollisionDetectionOptions {
  player: { x: number; y: number; radius: number };
  obstacles: Entity[];
  collectibles: Entity[];
  onHitObstacle: (obstacle: Entity) => void;
  onCollect: (collectible: Entity) => void;
}

export function useCollisionDetection({
  player,
  obstacles,
  collectibles,
  onHitObstacle,
  onCollect
}: UseCollisionDetectionOptions) {
  useEffect(() => {
    // Simple circle collision
    function isColliding(a: Entity | typeof player, b: Entity | typeof player) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < a.radius + b.radius;
    }

    obstacles.forEach((obs) => {
      if (isColliding(player, obs)) {
        onHitObstacle(obs);
      }
    });

    collectibles.forEach((col) => {
      if (isColliding(player, col)) {
        onCollect(col);
      }
    });
  }, [player, obstacles, collectibles, onHitObstacle, onCollect]);
}
