"use client";

import { collectibleStyles } from "../lib/collectibleStyles";
import { rarityStyles } from "../lib/rarityStyles";

interface CollectibleProps {
  x: number;
  y: number;
  radius: number;
  id: string;
  rarity: string;
}

export default function Collectible({ x, y, radius, id, rarity }: CollectibleProps) {
  const baseClass = collectibleStyles[id] ?? "collectible-moon-rock collectible-sparkle";
  const rarityClass = rarityStyles[rarity] ?? "rarity-common";

  return (
    <div
      className={`absolute rounded-full ${baseClass} ${rarityClass}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: x - radius,
        top: y - radius
      }}
    />
  );
}
